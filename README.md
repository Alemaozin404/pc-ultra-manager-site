# PC Ultra Manager Pro — Site Cinema com Download do Instalador

Este site estático divulga o PC Ultra Manager Pro Beta Fechado e deve disponibilizar um instalador `.exe`, não o `.zip` do projeto.

## Download correto

O botão do site aponta para:

```txt
downloads/PCUltraManagerProSetup.exe
```

Antes de publicar, gere o instalador no Windows e coloque esse arquivo dentro da pasta `downloads`.

## Gerar instalador

Use o script:

```txt
installer/PCUltraManagerPro.iss
```

Abra no Inno Setup e compile. O resultado esperado é:

```txt
PCUltraManagerProSetup.exe
```

Depois copie para:

```txt
downloads/PCUltraManagerProSetup.exe
```

## Publicar no GitHub Pages

1. Crie um repositório chamado `pc-ultra-manager-site`.
2. Envie todos os arquivos desta pasta.
3. Vá em **Settings > Pages**.
4. Escolha **Deploy from a branch**.
5. Branch `main` e pasta `/root`.
6. Salve e aguarde o link.

## Observação

Este site é estático. Ele não cria contas e não valida Premium. O backend do app continua no servidor FastAPI publicado no Render.
