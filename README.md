# flugel.biz Astro + React Version

稼働している自分自身の SolidStart 製屋号サイトを、Astro + React へリプレイスした実験リポジトリです。
Solid / Svelte / Vue は、自作の SSR 安全なグローバルストア機構を利用側で同じ処理なのですが、React は状態管理の利用方法に依存するので、Astro + React のみ別リポジトリになっています。
状態管理は、以前行った伝播速度測定により、複雑でない利用の場合は Legendapp State が最速だったので、こちらを採用しました。
なお、本リポジトリは Astro + React のみの構成ですが、Astro + Solid / Svelte / Vue のリポジトリと同じフォルダ構成です。

**Note:** 本リポジトリは、実験場という性質であるため Issues 及び Pull Requests は受け付けておりません。

## Tech Stack

- Astro 7.3.1 (SSG)
- Astro React 6.0.5
- Legendapp State
- TypeScript
- Sass
- ky
- Valibot
- Shiki

## Replaced Features

- SolidStart から各インテグレーションへの翻訳（静的コンポーネントは Solid JSX → Astro JSX、動的コンポーネントは JSX → React JSX、Signal → State）
- Meta 生成機構を Astro に合わせた上で適用（Solid JSX → Astro JSX、SiteMeta コンポーネント → Layout コンポーネント）
- Shiki コードの色付け実行を Astro 標準の Code コンポーネントでビルド時に生成、クライアント時の実行なし

## Replaced Festival Repositories

- [SolidStart 版](https://github.com/wings1685/flugel-website)
- [SvelteKit 版](https://github.com/wings1685/flugel-website-sveltekit)
- [Qwik 版](https://github.com/wings1685/flugel-website-qwik)
- [Next.js 版](https://github.com/wings1685/flugel-website-next)
- [Nuxt 版](https://github.com/wings1685/flugel-website-nuxt)
- [Astro + Solid / Svelte / Vue 版](https://github.com/wings1685/flugel-website-astro)

## Related Articles

- [同一サイトの 9 フレームワークパターンでのリプレイス祭](https://wings.hatenablog.com/entry/replaceFestival)
- [【極限編】同一 Astro 上で Solid / Svelte / Vue / React それぞれの処理速度を計測してみた（Qwik は無し）](https://wings.hatenablog.com/entry/benchmarkExtreme)
- [Meta 生成機構祭](https://wings.hatenablog.com/entry/metaFestival)

## Folder Map

```
src/
├─ _global/
│ ├─ lib/
│ ├─ piquo/
│ │ ├─ _models/
│ │ │ ├─ react/
│ ├─ styles/
│ ├─ types/
├─ components/
│ ├─ integrations/
│ │ ├─ react/
│ ├─ routes/
│ │ ├─ _models/
│ │ ├─ _parts/
│ │ ├─ archives/
│ │ │ ├─ _models/
│ │ │ ├─ _parts/
│ │ ├─ types/
│ │ │ ├─ _models/
│ │ │ ├─ _parts/
│ ├─ shared/
│ │ ├─ Sections/
│ │ ├─ Typography/
│ │ ├─ Utils/
├─ pages/
```
