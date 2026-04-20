const fs = require('fs')
const { chromium } = require('playwright')
const axeCore = require('axe-core')

async function run() {
  const url = process.env.A11Y_URL || 'http://localhost:3000'
  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] })
  const context = await browser.newContext()
  const page = await context.newPage()
  console.log('[a11y] Visiting', url)
  await page.goto(url, { waitUntil: 'networkidle' })
  // Inject axe-core and run
  await page.addScriptTag({ content: axeCore.source })
  const results = await page.evaluate(async () => {
    // eslint-disable-next-line no-undef
    return await axe.run()
  })
  fs.writeFileSync('a11y-violations.json', JSON.stringify(results, null, 2))
  console.log('[a11y] Violations saved to a11y-violations.json. Count:', (results.violations || []).length)
  await browser.close()
}

run().catch((err) => {
  console.error('[a11y] Error', err)
  process.exitCode = 1
})
