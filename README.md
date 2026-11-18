# Wild at Heart Lake Hotel

Landing page responsiva para o Wild at Heart Lake Hotel, com identidade visual Prism, animação de rolagem, seções de experiências e fluxo demonstrativo de reserva.

## Recursos

- Animação de rolagem com 201 quadros otimizados, servidos de `public/ezgif-499be590cf295bef-optimized/`.
- Layout responsivo de 320 px a monitores ultrawide, com busca empilhada em telas pequenas e menu móvel.
- Navegação por teclado, link para pular ao conteúdo, foco visível, formulário rotulado e modal com contenção e restauração de foco.
- Respeito à preferência `prefers-reduced-motion`.
- Exportação do banner em PNG 4K.

## Requisitos

- Node.js `20.19+` ou `22.12+` (requisito do Vite React plugin).
- npm.

## Executar localmente

Na raiz do projeto:

```bash
npm ci
npm run dev
```

Abra [http://127.0.0.1:4173](http://127.0.0.1:4173).

No PowerShell do Windows, se a política de execução bloquear `npm.ps1`, use os comandos equivalentes:

```powershell
npm.cmd ci
npm.cmd run dev
```

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento na porta 4173. |
| `npm run build` | Executa a verificação TypeScript e gera a versão de produção em `dist/`. |
| `npm run preview` | Serve localmente o conteúdo de `dist/` para validar a compilação. |

Para validar uma versão de produção:

```bash
npm run build
npm run preview
```

Publique o conteúdo de `dist/` em um host estático. Não publique somente o HTML: o Vite copia os quadros de `public/` para a saída de produção.

## Estrutura

```text
public/
  ezgif-499be590cf295bef-optimized/  # Imagem inicial e quadros da sequência
src/
  assets/images/imagens-site-wild/   # Fotografias das seções
  components/
    BannerArtboard.tsx               # Hero, navegação e busca
    LandingSections.tsx              # Seções e rodapé
    ScrollSequence.tsx               # Animação sincronizada à rolagem
  utils/exportBanner.ts              # Exportação do banner em PNG
```

## Fluxo de branches

- `main`: versão estável e pronta para publicação.
- `develop`: integração do trabalho antes de promover para `main`.
- Para mudanças, crie branches de tarefa a partir de `develop` e integre-as por pull request.
- Promova `develop` para `main` por pull request após validar o build.

## Criar o repositório no GitHub

1. No GitHub, crie um repositório chamado `wild-at-heart-landing`.
2. Descrição sugerida: **Landing page responsiva do Prism para o Wild at Heart Lake Hotel, com animação de rolagem, experiências e fluxo de reserva.**
3. Como os direitos de redistribuição das fotografias ainda precisam ser confirmados, mantenha o repositório privado até essa confirmação.
4. Não inicialize o repositório remoto com README, `.gitignore` ou licença: esses arquivos já estão no projeto, e ainda não há uma licença definida para as imagens.
5. No terminal, na pasta do projeto, confira os arquivos e publique as branches:

```bash
git init -b main
git add .
git status --short
git commit -m "Initial commit: Prism landing page"
git switch -c develop
git remote add origin https://github.com/SEU_USUARIO/wild-at-heart-landing.git
git push -u origin main
git push -u origin develop
```

Após o primeiro push, defina `main` como branch padrão e, se possível, proteja-a para receber mudanças apenas por pull request. O fluxo recomendado é trabalhar em branches de tarefa criadas a partir de `develop`, integrar nelas por pull request e promover `develop` para `main` depois de validar o build.

## Publicação das imagens

Antes de tornar o repositório público, confirme que você tem autorização para redistribuir as fotografias fornecidas. O projeto não declara uma licença para esses arquivos.
