# job-monitoring-tool

Zentrales Tool zur Überwachung von Jobs und Jobketten im DWH.

Wie man das Projekt nach GitHub pusht:

1. Lokales Repository initialisieren:

   git init
   git add .
   git commit -m "Initial commit"

2. Remote erstellen (GitHub Webseite) oder mit gh CLI:

   gh repo create <user>/job-monitoring-tool --public --source=. --remote=origin

   oder manuell auf GitHub ein neues Repository erstellen und dann:

   git remote add origin https://github.com/<user>/job-monitoring-tool.git
   git branch -M main
   git push -u origin main

3. Optional: GitHub Actions CI ist bereits enthalten unter `.github/workflows/maven.yml`.
