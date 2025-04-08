import { relative } from "path"

// This function creates the proper command with --file flags
const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => relative(process.cwd(), f))
    .join(" --file ")}`

const config = {
  // Match both .ts and .tsx files
  "*.{ts,tsx}": (filenames) => [
    buildEslintCommand(filenames),
    "tsc --noEmit",
    `prettier --write ${filenames.join(" ")}`,
  ],
}

export default config
