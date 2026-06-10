; PC Ultra Manager Pro - Instalador Inno Setup
; Como usar:
; 1. Gere o app com build_exe.bat
; 2. Confirme que existe: dist\PCUltraManagerPro.exe
; 3. Instale o Inno Setup no Windows
; 4. Abra este arquivo .iss no Inno Setup
; 5. Clique em Compile
; 6. O instalador sairá em: output\PCUltraManagerProSetup.exe

#define MyAppName "PC Ultra Manager Pro"
#define MyAppVersion "0.1.0-beta"
#define MyAppPublisher "PC Ultra Manager Pro"
#define MyAppExeName "PCUltraManagerPro.exe"

[Setup]
AppId={{C15A3E2D-7C64-4211-A4D5-PCULTRAMANAGERPRO}}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
DefaultDirName={autopf}\PC Ultra Manager Pro
DefaultGroupName=PC Ultra Manager Pro
DisableProgramGroupPage=yes
OutputDir=output
OutputBaseFilename=PCUltraManagerProSetup
Compression=lzma
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=lowest
ArchitecturesInstallIn64BitMode=x64
SetupIconFile=assets\app.ico
UninstallDisplayIcon={app}\{#MyAppExeName}

[Languages]
Name: "brazilianportuguese"; MessagesFile: "compiler:Languages\BrazilianPortuguese.isl"

[Tasks]
Name: "desktopicon"; Description: "Criar atalho na Área de Trabalho"; GroupDescription: "Atalhos:"; Flags: unchecked

[Files]
Source: "dist\PCUltraManagerPro.exe"; DestDir: "{app}"; Flags: ignoreversion
Source: "assets\*"; DestDir: "{app}\assets"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: DirExists(ExpandConstant('{src}\assets'))

[Icons]
Name: "{group}\PC Ultra Manager Pro"; Filename: "{app}\{#MyAppExeName}"
Name: "{autodesktop}\PC Ultra Manager Pro"; Filename: "{app}\{#MyAppExeName}"; Tasks: desktopicon

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "Abrir PC Ultra Manager Pro"; Flags: nowait postinstall skipifsilent
