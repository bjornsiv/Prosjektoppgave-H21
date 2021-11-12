# Prosjektoppgave-H21
Prosjektoppgave høsten 2021 - Silje, Aida, Anna, Sivert


## Informasjon om prosjektet

Prosjektet er to delt i en client del, og en server del. client delen er kun det estetiske, server delen kjører lokalt ved å ta utgangspunkt i client mappen. Dette betyr at for å kjøre server siden må den orginale mappe strukturen ivaretas. Server siden bruker NTNU sin database server, og det er påkrevd å være koblet til NTNUs nettverk for å fungere. Dette kan bli gjort gjennom en vpn. 

## Før du starter - Node.js og NPM

Du må ha Node.js og NPM installert på PC-en din. Node.js blir blant annet brukt når vi vil kjøre JavaScript kode i en server. NPM er en pakkebehandler, denne gjør det enklere å installere programvarebiblioteker som vi kan benytte oss av når vi programmer. NPM (Node Package Manager) bruker vi både på client og server delen.


## Kjøring av Nettside lokalt.

**1. Først**
Start med å kopiere filene lokalt til maskinen din med 'git clone' kommandoen. Når det er gjort må du åpne et terminalvindu og navigere til mappen der du klonet filene

**2. Client**
For å kjøre client siden lokalt må du navigere til './client'. Der må du kjøre 'npm install' for å installere alle pakkene. 
Deretter må du kjøre 'npm start' kommandoen, denne starter webpack-dev-server, som gir deg en forhåndsvisning av client siden, dog uten database oppsett. Den oppdaterer seg når en gjør endringer i koden, og kan gjernes kjøres i bakgrunnen. Den åpner automatisk en nettleser vindu med riktig adresse, som er : 'http://localhost:8080/#/'

**2.1. npm build**
'npm build' bygger en produksjonsklar bundle av nettsiden og den vil legge seg i './public' mappen.  Hvis kommandoen får feilmelding kan man prøve med 'npm run-script build' som et alternativ. 


**3. Server**
For at noen av funksjonene av client siden til å fungere, må man og kjøre serveren lokalt. Her må man navigere til './server' og kjøre 'npm install' for å installere alle nødvendige pakker. Deretter må man kjøre 'npm start' for å starte serveren lokalt. Den vil ta utgangspunkt i client bundlen i './client/public' mappen

## Testing

**1. client testing**
Naviger til client mappen i terminalvinduet og kjør kommandoen 'npm test', her vil man få en test rapport direkte i terminalen, samt en mer omfattende rapport i './coverage' mappen

**2. server testing**
Naviger til server mappen i terminalvinduet og kjør kommandoen 'npm test', her vil man få en test rapport direkte i terminalen, samt en mer omfattende rapport i './coverage' mappen


## git

**git clone**
git clone %repo% - for å klone et git prosjekt til sin lokale maskin. erstatt %repo% med link til github/gitlab mappen. 

**git checkout**
for å lage en ny branch må du kjøre 'git checkout -b "my-branch"' der my-branch er navnet på den nye branchen

for å bytte branch, må du kjøre 'git checkout "my-branch"'. der my-branch er navnet på branchen du vil bytte til. 

det skal merkes at du bør være i riktig branch før du starter å gjøre endringer. Dette er ikke et absolutt krav, men det gjør prosessen mye enklere. 

**sende endringer til git hub/lab**
Hvis du er i ønsket branch, og er ferdig med å gjøre endringer kan du sende det til github/lab. Da bør følgende kommandoer kjøres i følgende rekkefølge, det bør merkes at man ikke bør gjøre endringene i filene iløpet av denne prosessen: 

'git pull' - oppdaterer branchen man er i 

'git add .' - Denne legger alle filene med endringer i en 'pakke' som skal sendes til git. 

'git stage .' - Denne 'fryser' filene som er lagt i 'pakka'.

'git commit -m "My-message"' - Denne ferdigstiller 'pakka', og my-message er meldingen som beskriver hva som er gjort

'git push' - Denne sender den ferdigstilte pakka til github serveren

    Hvis det er en ny branch du sender opp, som ikke enda eksisterer i github repositorien så er du nødt til å bruke 'git push -u origin my-branch-name', der 'my-branch-name' er navnet til branchen du nettopp har laget
