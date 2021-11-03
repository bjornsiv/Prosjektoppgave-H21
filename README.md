# Prosjektoppgave-H21
Prosjektoppgave høsten 2021 - Silje, Aida, Anna, Sivert
                Client-siden


## Informasjon om prosjektet

Dette er foreløpelig kun client siden av prosjektet

## Før du starter - Node.js og NPM

Du må ha Node.js og NPM installert på PC-en din. Node.js blir blant annet brukt når vi vil kjøre JavaScript kode i en server. NPM er en pakkebehandler, denne gjør det enklere å installere programvarebiblioteker som vi kan benytte oss av når vi programmer. NPM (Node Package Manager) bruker vi både på client og server delen.




## Kjøring av Nettside lokalt.

**1. Først**
Start med å kopiere filene lokalt til maskinen din med 'git clone' kommandoen. Når det er gjort må du åpne et terminalvindu og navigere til mappen der du klonet filene

**2. Client**
For å kjøre client siden lokalt må du navigere til './client'. Der må du kjøre 'npm install' for å installere alle pakkene. 
Deretter må du kjøre 'npm start' kommandoen, da vil et nytt nettleser vindu åpne seg meg 'localhost:3000'. Denne vil forhåndsvise client siden. Denne vil oppdatere seg etterhvert som man gjør endringer underveis

'npm start' starter webpack-dev-server, som gir deg en forhåndsvisning av client siden, dog foreløpelig uten database oppsett. Den oppdaterer seg når en gjør endringer i koden, og kan gjernes kjøres i bakgrunnen. Den åpner automatisk en nettleser vindu med riktig adresse, som er : 'http://localhost:8080/#/'


**2. Server**
For at noen av funksjonene av client siden til å fungere, må man og kjøre serveren lokalt. Her må man navigere til './server' og kjøre 'npm install' for å installere alle nødvendige pakker. Deretter må man kjøre 'npm start' for å starte serveren lokalt.           


## Lage en deployment klar pakke av client siden

**1. npm build**
'npm build' bygger en produksjonsklar bundle av nettsiden og den vil legge seg i './public' mappen

## Testing

**3. npm test**
TBA

## git

**git clone**
git clone %repo% - for å klone et git prosjekt til sin lokale maskin. erstatt %repo% med link til github/gitlab mappen. 

**git checkout**
for å lage en ny branch må du kjøre 'git checkout -b "my-branch"' der my-branch er navnet på den nye branchen

for å bytte branch, må du kjøre 'git checkout "my-branch"'. der my-branch er navnet på branchen du vil bytte til. 

det skal merkes at du bør være i riktig branch før du starter å gjøre endringer. Dette er ikke et absolutt krav, men det gjør prosessen mye enklere. 

**sende endringer til git hub/lab**
Hvis du er i ønsket branch, og er ferdig med å gjøre endringer kan du sende det til github/lab. Da bør følgende kommandoer kjøres i følgende rekkefølge, det bør merkes at man ikke bør gjøre endringene i filene iløpet av denne prosessen: 

'git add .' - Denne legger alle filene med endringer i en 'pakke' som skal sendes til git. 


'git stage .' - Denne 'fryser' filene som er lagt i 'pakka'.

'git commit -m "My-message"' - Denne ferdigstiller 'pakka', og my-message er meldingen som beskriver hva som er gjort

'git push' - Denne sender den ferdigstilte pakka til github serveren

    Hvis det er en ny branch du sender opp, som ikke enda eksisterer i github repositorien så er du nødt til å bruke 'git push -u origin your-shiny-branch'
