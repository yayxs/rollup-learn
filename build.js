const rollup = require('rollup')

// import rollup from 'rollup'
/**
 * @type { import('rollup').RollupOptions }
 */
const inputOptions = {
  input: './src/index.js',
}
/**
 * @type { import('rollup').RollupOptions }
 */
const outputOptions = [
  {
    dir: 'dist/es',
    format: 'es',
    sourcemap: true,
    globals: {
      lodash: '_',
    },
  },
]

async function build() {
  let b,
    buildFail = false

  try {
    b = await rollup.rollup(inputOptions) // 生成bundle对象

    for (const opts of outputOptions) {
      const { output } = await b.generate(opts)
      await b.write(opts)
    }
  } catch (error) {
    buildFail = true
  }

  if (b) {
    await b.close()
  }

  process.exit(buildFail ? 1 : 0)
}

build()
