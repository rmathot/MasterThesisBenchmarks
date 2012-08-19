function messageHandler(event) {
	importScripts("../Prime/jsbn.js", "../Prime/jsbn2.js",
			"../Binary/BinaryScalar.js", "../OEF/OEF.js",
			"../ECC/eccunique.js", "../tests/testPrimes.js",
			"../tests/testBinary.js", "../tests/testOEF.js",
			"../tests/testECCP2011.js", "../tests/testECCOEF.js");

	// On récupère le message envoyé par la page principale
	var messageSent = event.data;

	// On teste la commande envoyée
	switch (messageSent.cmd) {
	case 'init':
		// On peut initialiser certaines parties de nos objets qui serviront
		// dans ce worker (attention au scope cependant !)
		break;
	case 'precompute':
		// On prépare le message de retour
		var start = new Date();
		var precomp = precomputeComb2(messageSent.parameter[0],
				messageSent.parameter[1], messageSent.parameter[2]);
		var stop = new Date();
		var result = formatPrec(precomp);
		var messageReturned = result;
		this.postMessage(messageReturned);
		break;
	}
}

// On définit la fonction à appeler lorsque la page principale nous sollicite
this.addEventListener('message', messageHandler, false);