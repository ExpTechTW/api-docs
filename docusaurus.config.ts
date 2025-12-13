import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "ExpTech API",
  tagline: "ExpTech API 技術文件",
  favicon: "img/favicon.ico",

  url: "https://exptechtw.github.io",
  baseUrl: "/api-docs/",
  organizationName: "ExpTechTW",
  projectName: "api-docs",

  onBrokenLinks: "throw",
  onDuplicateRoutes: "throw",

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "throw",
    },
  },

  i18n: {
    defaultLocale: "zh-Hant",
    locales: ["zh-Hant", "en", "ja"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          editUrl: "https://github.com/ExpTechTW/api-docs/tree/main",
          editLocalizedFiles: true,
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: {
          showReadingTime: true,
          editUrl: "https://github.com/ExpTechTW/api-docs/tree/main",
          editLocalizedFiles: true,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "ExpTech Studio",
      logo: {
        alt: "ExpTech Studio Logo",
        src: "img/exptech.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "apiSidebar",
          position: "left",
          label: "API",
        },
        {
          type: "docSidebar",
          sidebarId: "productSidebar",
          position: "left",
          label: "產品",
        },
        {
          type: "localeDropdown",
          position: "right",
        },
        {
          href: "https://github.com/ExpTechTW/api-Docs",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "文件",
          items: [
            {
              label: "API",
              to: "/docs/api/start/",
            },
            {
              label: "產品",
              to: "/docs/product/start/",
            },
          ],
        },
        {
          title: "社群連結",
          items: [
            {
              label: "Discord",
              href: "https://exptech.com.tw/dc",
            },
          ],
        },
        {
          title: "其他連結",
          items: [
            {
              label: "部落格",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/ExpTechTW",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ExpTech Studio.`,
    },
    prism: {
      theme: prismThemes.oneLight,
      darkTheme: prismThemes.oneDark,
      additionalLanguages: ["bash"],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
