# Osakunta

https://ko-osakunta.firebaseapp.com/

https://firebase.google.com/docs/cli/

# Karjalaisen osakunnan nettisivut

Karjalaisen osakunnan vanhat wordpress-pohjaiset sivut ovat vanhentuneet. Tavoitteena on luoda nykyaikaiset sivut uusilla tekniikoilla jotka vaativat mahdollisimman vähän ylläpitoa. Uudet sivut toteutetaan muun muassa Reactilla, Reduxilla ja Firebasella.

Sivun on tarkoitus olla näyttävä ja toimiva erilaisilla alustoilla, niiden pitää käsitellä dynaamista dataa ja niiden pitää olla muokattavissa admin-työkaluilla.

# Toteutetut toiminnallisuudet:

# Admin-sivu. 

Kun olet kirjautunut käyttäjällä sisään voit luoda uusia sivuja ja ilmoituksia. Näiden sivujen sisältöä voit muokata Draft-js-kirjaston editorilla. 

Editorilla onnistuu tekstin tyylittely sekä kuvien lisääminen. Tällä hetkellä kuvien lisäys tapahtuu urlien avulla, jatkossa tavoite on saada ne otettua sivulle ladatuista kuvista.

Admin-sivulla onnistuu gallerian ja bannerien lisäys ja valinta. Tällä hetkellä kuvia saa sekä flickristä että firebaseen ladatuista kuvista, myöhemmin näistä kuvaratkaistusta valitaan vain toinen.

# Admin luomat sivut

Oleellisimmat sivut räätälöidään jatkossa käsin rajoitetuilla muokkausmahdollisuuksilla, mutta tulevaisuudessa uusille sivuille voi olla tarvetta. Sivuja luodaan admin-sivuilla olevalla editorilla. Sivua voi muokata sen omalla sivulla, ja siellä sen voi myös poistaa.

# Tapahtumat

Tapahtumilla on oma sivunsa, ja ne luodaan ja muokataan samalla periaatteella kuin adminin luomilla sivuilla.

# Galleria

Sivuille on toteutettu hyvin yksinkertainen galleria, tärkeintä oli testata miten kuvien nouto, lataus ja valitseminen onnistuu.

# Kirjautuminen

Kirjautuminen on toteutettu Firebasen omalla autentikaatiolla.
