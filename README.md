STEPS - EXPRESS

in show:
-prelevo id da req.query.params
-prepare sql query:
"SELECT * FROM `posts` WHERE id = ? " per avoid sql injection per la sicurezza dei params che il client puo`passare
- imposto connection passando dei parametri connection.query(sql, [id], (err, posts)
-sql> eseguo query, funzione asincrona, quando finisce gestiamo risposta nella funzione callback con due parametri automatici (ex:eventlisteners: (err, posts)) in base alla risposta:errore Vs risultati

connection.query(sql, [id], (err, posts) 
-array con id che passa sopra al posto del ? 
-results/posts e`sempre un array quindi dobbiamo controllare che non sia vuoto
-se non e vuoto mxando un solo dato il primo element dell array
-in delete non c`e`result..o va a buon fine o no..(204) non ti mando Nessun contenuto..ho cancelalto e`andata tutto bene...anche qui prima dovrei controllare se trova post...

 - //quando mi arriva risultato faccio seconda query, se pizza e stata trovata seconda query

-------------WEBAPP----------------

file env> file nascosto, il Sistema operative lo nasconde
-in .gitignore metto node_modules and .env non pushamo mai in git 
-app.js punto ingress nostra applicazione
-port 3000 potrebbe essere variabile  dambiente perche puo cambiare
-in router la funzione di callback verra invocata da express quando questa rotta sara richiesta
-return res.json({data: movies[0]})  movies e un array, quindi se voglio solo uno devo mettere indice per oggetto

MIDDLEWARE
-sono funzioni, they have next, in case all goes fine, you go to next step..
-cattura errore e risponde con code 500
-se errore avviene all interno di una funzione asincrona l errore non e passato in automatico
in controller functions the err e un errore asincrono, non viene catturato, lo dobbiamo fare manualmente...