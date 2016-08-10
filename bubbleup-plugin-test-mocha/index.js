'use strict'

const path = require('path')
const fs = require('fs')

const {
  findPluginsByPrefix,
  requirePlugins,
  getNodeModulesPath,
  isBasePlugin,
  PLUGIN_PREFIX
} = require('bubbleup')

const Mocha = require('mocha')

const MOCHA_PREFIX = `${PLUGIN_PREFIX}-test-mocha`

function getAllJSFilesInDirectory (dir) {
  let files = []
  fs.readdirSync(dir).filter(function (file) {
    if (file.substr(-3) === '.js') {
      return files.push(path.join(dir, file))
    }

    const subdir = path.join(dir, file)
    if (fs.statSync(subdir).isDirectory()) {
      files.push(...getAllJSFilesInDirectory(subdir))
    }
  })

  return files
}

module.exports = {
  base: true,
  exec: function exec (files, options, cwd) {
    const mocha = new Mocha()

    // use custom plugins path if specified
    const pluginsPath = options.parent.pluginsPath
      ? path.join(cwd, options.parent.pluginsPath)
      : getNodeModulesPath(cwd)

    const pluginNames = findPluginsByPrefix(pluginsPath, MOCHA_PREFIX)

    const plugins = requirePlugins(pluginsPath, pluginNames)

    plugins.forEach(function (plugin) {
      if (!isBasePlugin(plugin)) {
        plugin.exec(mocha, require)
      }
    })

    const length = files.length

    // default to test/ dir like mocha cli does
    if (length === 0) {
      const TEST_DIR = path.join(cwd, 'test')
      const testFiles = getAllJSFilesInDirectory(TEST_DIR, [])
      testFiles.forEach(file => mocha.addFile(file))
    } else {
      files.forEach(function (file) {
        const absPath = path.join(cwd, file)
        mocha.addFile(absPath)
      })
    }

    mocha.run(function (failures) {
      process.on('exit', function () {
        process.exit(failures)
      })
    })
  }
}
