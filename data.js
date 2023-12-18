var changedType;

function changeType(type) {
    var additionalFvText;

    if (type == "ZAMÓWIENIA") {
        additionalFvText = "Na zamówieniu ustaw status na 'Zakończone'.";
    } else {
        additionalFvText = "";
    }

    addFV.text = `Jeśli masz uprawnienia, wystaw fakturę WPROST Z ${type}. Jeśli są to materiały (a nie modele), to koniecznie zaznacz ptaszkiem pole WZ. UWAGA: sprawdź czy na fakturze zgadzają się: waluta, termin płatności, ceny. ${additionalFvText}`;
}

//koniec sciezki
var end = {
    title: "Koniec ścieżki",
    text: "Nie ma nic do zrobienia",
}

//sprawdz czy klient wyslal zamowienie czy zapytanie
var isOrder = {
    title: "Zapytanie czy zamówienie?",
    text: "Sprawdź, czy klient przesłał już gotowe zamówienie, czy tylko zapytanie",
    buttons: [
        {buttonFunction: "show(addOrder, this);", buttonName: "Gotowe zamówienie"},
        {buttonFunction: "show(addOffer, this);", buttonName: "Tylko zapytanie"}
]}

//dodaj oferte
var addOffer = {
    title: "Dodaj ofertę",
    text: "Utwórz w systemie ofertę na produkty, o które pyta klient. Następnie wyślij ją przez system i czekaj na akceptację.",
    buttons: [
        {buttonFunction: "show(end, this);", buttonName: "Czekam na akceptację"},
        {buttonFunction: "show(isProduct, this); changeType('OFERTY');", buttonName: "Jest akceptacja"}
]}

//czy produkt jest na stanie?
var isProduct = {
    title: "Czy produkt jest na stanie?",
    text: "Sprawdź, czy produkt jest na stanie magazynowym",
    buttons: [
        {buttonFunction: "show(addFV, this);", buttonName: "Jest"},
        {buttonFunction: "show(offerCreated, this);", buttonName: "Nie ma (dead end)"}
]}

var addFV = {
    title: "Dodaj fakturę",
    text: "",
    buttons: [
        {buttonFunction: "show(sendFV, this);", buttonName: "Mam uprawnienia (wystawiłem FV)"},
        {buttonFunction: "show(sendToBoss, this);", buttonName: "Nie mam uprawnień"}
]}

var sendFV = {
    title: "Wyślij fakturę do klienta",
    text: "Wyślij fakturę do klienta poprzez CRM. Koniecznie zaznacz ptaszkiem, że faktura została wysłana.",
    buttons: [
        {buttonFunction: "show(end, this);", buttonName: "Wysłałem fakturę"}
]}

var sendToBoss = {
    title: "Wyślij prośbę o wystawienie faktury",
    text: "Wyślij prośbę o wystawienie faktury na podstawie oferty do osoby uprawnionej (np. do szefów). Pamiętaj, aby zarezerwować towar wystawiając na towar WZkę. NIE ZAMYKAJ BUFORU! Bufor zamykamy dopiero przy wysyłce!",
    buttons: [
        {buttonFunction: "show(end, this);", buttonName: "Wysłałem prośbę"}
]}

//dodaj zamowienie
var addOrder = {
    title: "Dodaj zamówienie",
    text: "Dodaj zamówienie w CRMie uzupełniając wszystkie niezbędne dane",
    buttons: [
        {buttonFunction: "show(orderCreated, this); changeType('ZAMÓWIENIA');", buttonName: "Zamówienie utworzone"}
]}

var orderCreated = {
    title: "Wydruk i status",
    text: "Wydrukuj zamówienie i połóż na 'stole operacyjnym'. Ustaw status na 'Przyjęte' ale TYLKO WTEDY, KIEDY ZAMÓWIENIE LEŻY NA STOLE.",
    buttons: [
        {buttonFunction: "show(isProduct, this);", buttonName: "Utworzone i wydrukowane"}
]}