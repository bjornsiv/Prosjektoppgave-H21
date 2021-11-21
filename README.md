# Prosjektoppgave-H21
Denne prosjektoppgaven ble utført som en del av emnet INFT2002 Webutvikling, gjennomført ved NTNU høsten 2021. Gruppe 1 består av Silje, Aida, Anna og Sivert.



## Informasjon om prosjektet
Prosjektet er todelt - med en klientside og en serverside. Klientsiden representerer det estetiske, mens serversiden kjører lokalt ved å ta utgangspunkt i klient-mappen. Dette betyr at for å kjøre serversiden, må den originale mappestrukturen ivaretas. Serversiden bruker NTNU sin databaseserver, og det er påkrevd å være tilkoblet NTNUs nettverk for at dette skal fungere. Dette kan gjøres ved bruk av en VPN.



## Node.js og NPM 
Før du begynner må du ha installert Node.js og NPM. Node.js blir blant annet brukt til å kjøre JavaScript-kode i serveren, mens NPM er en pakkebehandler som forenkler installasjonen av programvarebiblioteker slik at vi kan benytte oss av disse. NPM brukes både på klient- og serversiden.  



## Kjøre nettside lokalt

**1.** Kopier filene lokalt til din datamaskin ved hjelp av kommandoen ‘git clone’. Åpne deretter et terminalvindu og naviger til den mappen du klonet filene til. 

**2.** For å kjøre klientsiden lokalt må en først navigere til `./client`. Kjør kommandoen ‘npm install’ for å installere alle pakkene, etterfulgt av ‘npm run-script build’. Sistnevnte lager en publiserbar versjon av nettsiden og alle de nødvendige pakkene. ‘npm run-script build’ må kjøres hver gang en skal vise nye endringer. 

Et alternativ er å kjøre webpack-dev-server, som gir deg en forhåndsvisning av klientsiden (uten databaseoppsett). Den fungerer ikke på alle maskiner uten å gjøre endringer i de lokale instillingene. Webpack-dev-server oppdaterer seg når en gjør endringer i koden, og kan gjerne kjøres i bakgrunnen. Den åpner automatisk et vindu i nettleseren med adressen http://localhost:8080/#/.

**2.1.**
Kommandoen ‘npm build’ bygger en utvikling bundle av nettsiden og vil legge seg i public-katalogen. Dersom dette fører til en feilmelding, kan en forsøke å bruke kommandoen ‘npm run-script build’ som et alternativ.

**2.2** 
Det finnes og en 'npm build-prod' kommando som bygger en produksjonsklar bundle av nettsiden. Denne vil legge seg i './client/public' mappen. 

**3.** For å kjøre serveren, start med å navigere til `./server` og kjør kommandoen ‘npm install’. Dette installerer alle nødvendige pakker. Deretter kjøres ‘npm start’ for å starte serveren lokalt. Denne tar utgangspunkt i bundle i `./client/public`. 


## Testing

**1. Klienttesting:** Naviger til `./client` i terminalvinduet og kjør deretter kommandoen 'npm install' for å installere alle de nødvendige pakkene. Deretter kjøres 'npm test'. Dette vil resultere i en testrapport som vises direkte i terminalen, samt en mer omfattende rapport i mappen `./coverage`.

**2. Servertesting:** Naviger til `./server` i terminalvinduet og kjør deretter kommandoen 'npm install' for å installere alle de nødvendige pakkene. Deretter kjøres 'npm test'. Dette vil resultere i en testrapport som vises direkte i terminalen, samt en mer omfattende rapport i mappen `./coverage`.


## Prosject struktur tre
```bash
├───.github
│   └───workflows
├───client
│   ├───public
│   ├───src
│   ├───test
│   │   └───__snapshots__
│   └───__mocks__
└───server
    ├───src
    └───test
```

## Git tutorial

**Git clone:** Bruk ‘git clone %repo%’ for å klone et git-prosjekt til din lokale datamaskin. Erstatt %repo% med en link til GitHub eller GitLab-mappen. 


**Git checkout:** For å opprette en ny branch; skriv kommandoen ‘git checkout -b "my-branch", der "my-branch" er navnet på den nye branchen.

Dersom en ønsker å bytte branch, kan dette gjøres ved å kjøre kommandoen ‘git checkout "my-branch", der "my-branch" er navnet på den branchen du ønsker å bytte til.

Merk at en bør være i riktig branch før en begynner å gjøre endringer. Dette er ikke et absolutt krav, men gjør prosessen mye enklere. 


**Sende endringer til GitHub/GitLab:** Når du er i ønsket branch og er ferdig med å gjøre endringer, kan du sende dette til GitLab eller GitHub. Følgende kommandoer bør kjøres i riktig rekkefølge, og en bør ikke foreta noen endringer i løpet av denne prosessen:


'git pull' oppdaterer den branchen man er i 


'git add .' legger alle filene med endringer i en pakke som skal sendes til Git 


'git stage .' fryser filene som er lagt i pakken


'git commit -m "my-message"' ferdigstiller pakken. Bytt ut "my-message" med en beskrivende kommentar som forklarer hva som er gjort av endringer


'git push' sender den ferdigstilte pakken til GitHub eller GitLab-serveren


Dersom du ønsker å sende opp en ny branch som enda ikke eksisterer i GitHub eller GitLab-repository, er det nødvendig å kjøre kommandoen 'git push -u origin "my-branch", der "my-branch" er navnet på den branchen du nettopp laget.


## Referanser
I dette prosjektet har vi tatt utgangspunkt i egen kode og kode fra leksjoner, samt tatt inspirasjon fra sider som StackOverflow, Bootstrap-biblioteket og lignende. Ved kopi av kode har vi referert til dette i den gjeldende filen.
