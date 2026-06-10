# Gerar instalador do PC Ultra Manager Pro

O site deve disponibilizar um instalador `.exe`, não o `.zip` do projeto.

## Fluxo correto

1. Extraia o projeto do app.
2. Rode `build_exe.bat`.
3. Confirme que o arquivo foi gerado:

```txt
dist/PCUltraManagerPro.exe
```

4. Instale o Inno Setup no Windows.
5. Copie o arquivo:

```txt
installer/PCUltraManagerPro.iss
```

para a raiz do projeto do app, no mesmo nível de `dist/`.

6. Abra o `.iss` no Inno Setup.
7. Clique em **Compile**.
8. O instalador será gerado em:

```txt
output/PCUltraManagerProSetup.exe
```

9. Copie esse instalador para o site em:

```txt
downloads/PCUltraManagerProSetup.exe
```

10. Publique o site.

## Resultado final para o usuário

O usuário acessa o site, clica em **Baixar instalador**, baixa:

```txt
PCUltraManagerProSetup.exe
```

Depois ele executa, instala o app e abre pelo atalho.
