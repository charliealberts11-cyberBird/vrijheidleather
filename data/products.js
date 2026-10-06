/*
 * VRIJHEID LEATHER WORKS — PRODUCT CATALOGUE DATA
 * ------------------------------------------------
 * Single source of truth for every product shown on the website
 * (Home "featured" section and the Products page).
 *
 * Source: Vrijheid Corporate Catalogue 2026 (Catalogue\Vrijheid 2026.pptx).
 * All names, prices, materials, sizes and features below were checked
 * against that catalogue. When the catalogue changes, update it here only.
 *
 * FIELDS
 *   id / slug        unique identifier, also used for deep links: products.html#<slug>
 *   category         one or more filter keys: everyday, work, home, golf, field, corporate
 *   featured         true = shown on the Home page (keep to about six)
 *   price            number in N$ used for sorting / structured data (null = varies)
 *   price_display    { en, af } text shown on cards, e.g. "N$3,500"
 *   price_note       { en, af } optional small print under the price
 *   images           keys from data/images.js — first image is the main photograph
 *   alt              { en: [...], af: [...] } alt text per image, same order as images
 *   name / short / description / features / customisation — { en, af }
 */
window.VRIJHEID_PRODUCTS = [
  {
    id: 'weekender-bag', slug: 'weekender-bag',
    category: ['work'], featured: true,
    price: 3500,
    price_display: { en: 'N$3,500', af: 'N$3,500' },
    images: ['weekender-bag', 'hero-weekender-bags'],
    alt: {
      en: ['Dark brown leather Weekender Bag engraved with the name Henry', 'Two leather Weekender Bags on a white shelf beside a folded shirt'],
      af: ['Donkerbruin leer-naweeksak gegraveer met die naam Henry', 'Twee leer-naweeksakke op \'n wit rak langs \'n gevoude hemp']
    },
    name: { en: 'Weekender Bag', af: 'Naweeksak' },
    short: {
      en: 'Generous space in a clean, compact silhouette — made for weekends away and short business trips.',
      af: 'Ruim spasie in \'n netjiese, kompakte vorm — gemaak vir naweke weg en kort sakereise.'
    },
    description: {
      en: 'Designed for weekends away and short business trips, the Vrijheid Weekender combines generous storage with a clean, compact silhouette. Handcrafted from genuine leather and available with personalised engraving.',
      af: 'Ontwerp vir naweke weg en kort sakereise, kombineer die Vrijheid-naweeksak ruim bergplek met \'n netjiese, kompakte vorm. Met die hand gemaak van egte leer en beskikbaar met verpersoonlikte gravering.'
    },
    features: {
      en: ['Genuine leather', 'Perfect for short business trips', 'Loads of space, yet compact', 'Engraving of choice'],
      af: ['Egte leer', 'Perfek vir kort sakereise', 'Baie spasie, tog kompak', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name, initials or a short message of your choice.',
      af: 'Graveer \'n naam, voorletters of \'n kort boodskap van jou keuse.'
    }
  },
  {
    id: 'laptop-bag', slug: 'laptop-bag',
    category: ['work'], featured: true,
    price: 2500,
    price_display: { en: 'N$2,500', af: 'N$2,500' },
    images: ['laptop-bag', 'laptop-bag-interior'],
    alt: {
      en: ['Tan leather Laptop Bag resting on a laptop on a wooden table', 'Open Laptop Bag showing the padded inner compartments'],
      af: ['Taankleurige leer-skootrekenaarsak op \'n skootrekenaar op \'n houttafel', 'Oop skootrekenaarsak wat die gevoerde binnekompartemente wys']
    },
    name: { en: 'Laptop Bag', af: 'Skootrekenaarsak' },
    short: {
      en: 'Simple, compact and elegant, with padded compartments and a shoulder strap.',
      af: 'Eenvoudig, kompak en elegant, met gevoerde kompartemente en \'n skouerband.'
    },
    description: {
      en: 'A simple, compact and elegant laptop bag with extra padding in the compartments to protect what you carry. Take it by the handles or on the shoulder strap — handcrafted from genuine leather and ready to be engraved.',
      af: '\'n Eenvoudige, kompakte en elegante skootrekenaarsak met ekstra opvulling in die kompartemente om te beskerm wat jy dra. Dra dit aan die handvatsels of met die skouerband — met die hand gemaak van egte leer en gereed om gegraveer te word.'
    },
    features: {
      en: ['Genuine leather', 'Extra padding in compartments', 'Simple, compact and elegant', 'Shoulder strap and carry handles', 'Engraving of choice'],
      af: ['Egte leer', 'Ekstra opvulling in kompartemente', 'Eenvoudig, kompak en elegant', 'Skouerband en handvatsels', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name, initials or company logo.',
      af: 'Graveer \'n naam, voorletters of maatskappylogo.'
    }
  },
  {
    id: 'deskpad', slug: 'deskpad',
    category: ['work', 'corporate'], featured: false,
    price: 850,
    price_display: { en: 'N$850', af: 'N$850' },
    images: ['deskpad', 'deskpad-branding'],
    alt: {
      en: ['Brown leather Deskpad with a laptop and mouse in front of a window overlooking the Namibian bush', 'Close-up of leather Deskpads engraved with a logistics company logo'],
      af: ['Bruin leer-lessenaarmat met \'n skootrekenaar en muis voor \'n venster wat oor die Namibiese bos uitkyk', 'Nabyskoot van leer-lessenaarmatte gegraveer met \'n logistieke maatskappy se logo']
    },
    name: { en: 'Deskpad', af: 'Lessenaarmat' },
    short: {
      en: 'Genuine 3 mm leather, 600 × 350 mm — warmth and order for any desk.',
      af: 'Egte 3 mm-leer, 600 × 350 mm — warmte en orde op enige lessenaar.'
    },
    description: {
      en: 'A generous 600 × 350 mm desk pad cut from genuine 3 mm leather. It brings warmth and order to any desk, and makes a distinguished corporate gift when engraved with a name or company logo.',
      af: '\'n Ruim lessenaarmat van 600 × 350 mm, gesny uit egte 3 mm-leer. Dit bring warmte en orde op enige lessenaar en is \'n stylvolle korporatiewe geskenk wanneer dit met \'n naam of maatskappylogo gegraveer word.'
    },
    features: {
      en: ['Genuine 3 mm leather', 'Size: 600 mm × 350 mm', 'Engraving of choice'],
      af: ['Egte 3 mm-leer', 'Grootte: 600 mm × 350 mm', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name or your company logo — ideal for corporate orders.',
      af: 'Graveer \'n naam of jou maatskappylogo — ideaal vir korporatiewe bestellings.'
    }
  },
  {
    id: 'toiletry-bag-high-end', slug: 'high-end-toiletry-bag',
    category: ['work'], featured: false,
    price: 1550,
    price_display: { en: 'N$1,550', af: 'N$1,550' },
    images: ['toiletry-bag-high-end', 'toiletry-bag-high-end-hanging'],
    alt: {
      en: ['Open High-End Toiletry Bag in dark game leather showing its compartments and grooming items', 'High-End Toiletry Bag hanging on a hook, zipped closed'],
      af: ['Oop luukse toiletsak van donker wildsleer wat sy kompartemente en versorgingsitems wys', 'Luukse toiletsak wat toegerits aan \'n haak hang']
    },
    name: { en: 'High-End Toiletry Bag', af: 'Luukse Toiletsak' },
    short: {
      en: 'Genuine game leather, three compartments and hidden inner pockets.',
      af: 'Egte wildsleer, drie kompartemente en versteekte binnesakke.'
    },
    description: {
      en: 'Made from genuine game leather with high-end finishes, this toiletry bag keeps everything in its place with three compartments and extra hidden pockets inside.',
      af: 'Gemaak van egte wildsleer met hoë-gehalte afwerking, hou hierdie toiletsak alles op sy plek met drie kompartemente en ekstra versteekte sakke binne.'
    },
    features: {
      en: ['Genuine game leather', 'High-end finishes', '3 compartments', 'Extra hidden pockets inside', 'Engraving of choice'],
      af: ['Egte wildsleer', 'Hoë-gehalte afwerking', '3 kompartemente', 'Ekstra versteekte sakke binne', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name, initials or a short message of your choice.',
      af: 'Graveer \'n naam, voorletters of \'n kort boodskap van jou keuse.'
    }
  },
  {
    id: 'toiletry-bag-basic', slug: 'basic-toiletry-bag',
    category: ['work', 'everyday'], featured: false,
    price: 550,
    price_display: { en: 'N$550', af: 'N$550' },
    images: ['toiletry-bag-basic'],
    alt: {
      en: ['Two brown leather Basic Toiletry Bags engraved with a logo, on a wooden surface'],
      af: ['Twee bruin leer- basiese toiletsakke gegraveer met \'n logo, op \'n houtoppervlak']
    },
    name: { en: 'Basic Toiletry Bag', af: 'Basiese Toiletsak' },
    short: {
      en: 'Genuine leather with an inner lining — simple, practical and easy to personalise.',
      af: 'Egte leer met \'n binnevoering — eenvoudig, prakties en maklik om te verpersoonlik.'
    },
    description: {
      en: 'An uncomplicated toiletry bag in genuine leather with an inner lining — practical for everyday travel and an easy gift to personalise.',
      af: '\'n Eenvoudige toiletsak van egte leer met \'n binnevoering — prakties vir alledaagse reise en \'n maklike geskenk om te verpersoonlik.'
    },
    features: {
      en: ['Genuine leather', 'Inner lining', 'Engraving of choice'],
      af: ['Egte leer', 'Binnevoering', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name, initials or a company logo.',
      af: 'Graveer \'n naam, voorletters of \'n maatskappylogo.'
    }
  },
  {
    id: 'smart-wallet', slug: 'smart-wallet',
    category: ['everyday'], featured: false,
    price: 600,
    price_display: { en: 'N$600', af: 'N$600' },
    images: ['smart-wallet', 'smart-wallet-cards'],
    alt: {
      en: ['Brown leather Smart Wallet engraved with initials, resting on a hide beside coins', 'Smart Wallet standing upright with cards partly raised from its card compartment'],
      af: ['Bruin leer- slim beursie gegraveer met voorletters, op \'n vel langs muntstukke', 'Slim beursie wat regop staan met kaarte wat deels uit die kaartkompartement uitsteek']
    },
    name: { en: 'Smart Wallet', af: 'Slim Beursie' },
    short: {
      en: 'RFID-proof compartment, holds seven cards, notes and change.',
      af: 'RFID-beskermde kompartement, hou sewe kaarte, note en kleingeld.'
    },
    description: {
      en: 'A considered everyday wallet in genuine leather, with an RFID-proof compartment, space for seven cards in total, and room for paper money and a change pocket.',
      af: '\'n Deurdagte alledaagse beursie van egte leer, met \'n RFID-beskermde kompartement, plek vir altesaam sewe kaarte, en ruimte vir papiergeld en \'n kleingeldsakkie.'
    },
    features: {
      en: ['Genuine leather', 'RFID-proof compartment', 'Holds 7 cards in total', 'Space for paper money', 'Change pocket', 'Engraving of choice'],
      af: ['Egte leer', 'RFID-beskermde kompartement', 'Hou altesaam 7 kaarte', 'Plek vir papiergeld', 'Kleingeldsakkie', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave initials, a name or a short message.',
      af: 'Graveer voorletters, \'n naam of \'n kort boodskap.'
    }
  },
  {
    id: 'belt', slug: 'golf-everyday-belt',
    category: ['everyday', 'golf'], featured: false,
    price: 550,
    price_display: { en: 'N$550', af: 'N$550' },
    images: ['belt', 'belt-worn'],
    alt: {
      en: ['Coiled black leather Golf / Everyday Belt with a brushed metal buckle on an oak surface', 'Dark brown leather belt with a brushed steel buckle, worn with khaki trousers'],
      af: ['Opgerolde swart leer- gholf- / alledaagse gordel met \'n geborselde metaalgespe op \'n eikehoutoppervlak', 'Donkerbruin leergordel met \'n geborselde staalgespe, gedra met kakiebroek']
    },
    name: { en: 'Golf / Everyday Belt', af: 'Gholf- / Alledaagse Gordel' },
    short: {
      en: 'Genuine leather with a ratchet system for easy size adjustment. Brown or black.',
      af: 'Egte leer met \'n ratstelsel vir maklike grootteverstelling. Bruin of swart.'
    },
    description: {
      en: 'A genuine leather belt with a unique ratchet system for easy size adjustment — equally at home on the course and in the office. Available in brown or black and in various sizes.',
      af: '\'n Egte leergordel met \'n unieke ratstelsel vir maklike grootteverstelling — ewe tuis op die gholfbaan as in die kantoor. Beskikbaar in bruin of swart en in verskeie groottes.'
    },
    features: {
      en: ['Genuine leather', 'Unique ratchet system for size adjustment', 'Various sizes available', 'Brown or black', 'Engraving of choice'],
      af: ['Egte leer', 'Unieke ratstelsel vir grootteverstelling', 'Verskeie groottes beskikbaar', 'Bruin of swart', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Choose brown or black and your size; add engraving of your choice.',
      af: 'Kies bruin of swart en jou grootte; voeg gravering van jou keuse by.'
    }
  },
  {
    id: 'keychains', slug: 'keychains',
    category: ['everyday', 'corporate'], featured: false,
    price: null,
    price_display: { en: 'Price varies by order', af: 'Prys wissel volgens bestelling' },
    images: ['keychains', 'keychains-engraved'],
    alt: {
      en: ['Two bull-head shaped leather keychains with stitched edges, one engraved Lapa', 'Round leather keychains engraved for an event, on a hide with dice'],
      af: ['Twee leersleutelhouers in die vorm van \'n bulkop met gestikte rande, een gegraveer met Lapa', 'Ronde leersleutelhouers gegraveer vir \'n geleentheid, op \'n vel met dobbelstene']
    },
    name: { en: 'Keychains', af: 'Sleutelhouers' },
    short: {
      en: 'A wide variety of designs, customised to your order and engraved.',
      af: '\'n Wye verskeidenheid ontwerpe, aangepas vir jou bestelling en gegraveer.'
    },
    description: {
      en: 'A wide variety of leather keychains that can be customised in size and design and engraved with your choice of name, word or logo — a small, personal piece that is used every day, and a practical corporate gift.',
      af: '\'n Wye verskeidenheid leersleutelhouers wat in grootte en ontwerp aangepas en met \'n naam, woord of logo van jou keuse gegraveer kan word — \'n klein, persoonlike stuk wat elke dag gebruik word, en \'n praktiese korporatiewe geskenk.'
    },
    features: {
      en: ['Big variety of keychains', 'Can be customised on size and more', 'Engraving of choice', 'Price varies according to the order'],
      af: ['Groot verskeidenheid sleutelhouers', 'Kan in grootte en meer aangepas word', 'Gravering van jou keuse', 'Prys wissel volgens die bestelling']
    },
    customisation: {
      en: 'Tell us the size, design, engraving and quantity you need and we will quote you.',
      af: 'Laat weet ons die grootte, ontwerp, gravering en hoeveelheid wat jy benodig, en ons sal vir jou \'n kwotasie gee.'
    }
  },
  {
    id: 'multitool-holder', slug: 'multitool-holder',
    category: ['everyday', 'field'], featured: false,
    price: 650,
    price_display: { en: 'From N$650', af: 'Vanaf N$650' },
    images: ['multitool-holder', 'multitool-holder-open'],
    alt: {
      en: ['Leather Multitool Holder with press-stud closure, engraved with a company name, beside an open multitool', 'Tan leather Multitool Holder with a multitool partly inserted, on a leather hide'],
      af: ['Leer-multigereedskaphouer met drukknoopsluiting, gegraveer met \'n maatskappynaam, langs \'n oop multigereedskap', 'Taankleurige leer-multigereedskaphouer met \'n multigereedskap deels ingesit, op \'n leervel']
    },
    name: { en: 'Multitool Holder', af: 'Multigereedskaphouer' },
    short: {
      en: 'Genuine 3 mm leather, game or bovine, sized to fit your tool.',
      af: 'Egte 3 mm-leer, wild of bees, pasgemaak vir jou gereedskap.'
    },
    description: {
      en: 'Made from genuine 3 mm thick leather — game or bovine — and cut to fit your tool. A practical, sturdy holder that can be engraved with a name or logo.',
      af: 'Gemaak van egte, 3 mm dik leer — wild- of beesleer — en gesny om jou gereedskap te pas. \'n Praktiese, stewige houer wat met \'n naam of logo gegraveer kan word.'
    },
    features: {
      en: ['Genuine 3 mm thick leather', 'Game or bovine leather', 'Customised sizes', 'Engraving of choice'],
      af: ['Egte 3 mm dik leer', 'Wild- of beesleer', 'Pasgemaakte groottes', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Sized to your multitool, in game or bovine leather, with engraving of your choice.',
      af: 'Pasgemaak vir jou multigereedskap, in wild- of beesleer, met gravering van jou keuse.'
    }
  },
  {
    id: 'golf-ball-case', slug: 'golf-ball-case',
    category: ['golf'], featured: true,
    price: 550,
    price_display: { en: 'N$550', af: 'N$550' },
    images: ['golf-ball-case', 'golf-ball-case-colours'],
    alt: {
      en: ['Tan leather Golf Ball Case with perforations on the grass beside a golf ball and tee', 'Golf Ball Cases in navy and tan leather with golf balls, tees and a divot tool'],
      af: ['Taankleurige leer-gholfbalhouer met perforasies op die gras langs \'n gholfbal en tee', 'Gholfbalhouers in vlootblou en taankleurige leer met gholfballe, tees en \'n merkertjie']
    },
    name: { en: 'Golf Ball Case', af: 'Gholfbalhouer' },
    short: {
      en: 'Holds three balls and four tees, and clips onto your golf bag.',
      af: 'Hou drie balle en vier tees, en knip aan jou gholfsak vas.'
    },
    description: {
      en: 'Carries three golf balls and four tees, and clips straight onto your golf bag. Made from genuine leather and engraved with the name, initials or logo of your choice — a thoughtful gift for any golfer.',
      af: 'Hou drie gholfballe en vier tees, en knip sommer aan jou gholfsak vas. Gemaak van egte leer en gegraveer met die naam, voorletters of logo van jou keuse — \'n deurdagte geskenk vir enige gholfspeler.'
    },
    features: {
      en: ['Genuine leather', 'Carries 3 balls and 4 golf tees', 'Clips onto golf bag', 'Engraving of choice'],
      af: ['Egte leer', 'Hou 3 balle en 4 gholftees', 'Knip aan gholfsak vas', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name, initials or a club or company logo.',
      af: 'Graveer \'n naam, voorletters of \'n klub- of maatskappylogo.'
    }
  },
  {
    id: 'knobel-set', slug: 'knobel-set',
    category: ['golf', 'corporate'], featured: true,
    price: 1800,
    price_display: { en: 'N$1,800 / N$2,200', af: 'N$1,800 / N$2,200' },
    price_note: { en: '4-cup set N$1,800 · 6-cup set N$2,200', af: 'Stel met 4 bekers N$1,800 · stel met 6 bekers N$2,200' },
    images: ['knobel-set'],
    alt: {
      en: ['Stacked leather knobel cups engraved with a lion, a honey badger and other wildlife, with dice'],
      af: ['Gestapelde leer-knobelbekers gegraveer met \'n leeu, \'n ratel en ander wild, met dobbelstene']
    },
    name: { en: 'Knobel Set', af: 'Knobelstel' },
    short: {
      en: 'Heavy-duty 5 mm oryx leather. Everything you need to play.',
      af: 'Swaardiens 5 mm-gemsbokleer. Alles wat jy nodig het om te speel.'
    },
    description: {
      en: 'Made from heavy-duty 5 mm thick oryx leather, each set contains everything needed to play. Choose a 4-cup or 6-cup set, with a variety of branding available — a proudly Namibian gift for friends, family or clients.',
      af: 'Gemaak van swaardiens, 5 mm dik gemsbokleer; elke stel bevat alles wat nodig is om te speel. Kies \'n stel met 4 of 6 bekers, met \'n verskeidenheid handelsmerkopsies beskikbaar — \'n trots Namibiese geskenk vir vriende, familie of kliënte.'
    },
    features: {
      en: ['Heavy-duty 5 mm thick oryx leather', 'Set contains everything needed to play', '4-cup or 6-cup sets available', 'Variety of branding available'],
      af: ['Swaardiens 5 mm dik gemsbokleer', 'Stel bevat alles wat nodig is om te speel', 'Stelle met 4 of 6 bekers beskikbaar', 'Verskeidenheid handelsmerkopsies beskikbaar']
    },
    customisation: {
      en: 'A variety of branding is available — from wildlife artwork to your own logo.',
      af: '\'n Verskeidenheid handelsmerkopsies is beskikbaar — van natuurkuns tot jou eie logo.'
    }
  },
  {
    id: 'apron', slug: 'apron',
    category: ['home'], featured: false,
    price: 1700,
    price_display: { en: 'N$1,700', af: 'N$1,700' },
    images: ['apron'],
    alt: {
      en: ['Full-length dark brown leather Apron hanging against a wall, with braai tools in its pockets'],
      af: ['Vollengte donkerbruin leervoorskoot wat teen \'n muur hang, met braaigereedskap in die sakke']
    },
    name: { en: 'Apron', af: 'Voorskoot' },
    short: {
      en: 'Full-length, heavy-duty 3 mm leather with pockets for phone, drink and braai tools.',
      af: 'Vollengte, swaardiens 3 mm-leer met sakke vir foon, drankie en braaigereedskap.'
    },
    description: {
      en: 'A full-length apron in heavy-duty, 3 mm thick genuine leather, with pockets for your phone, a drink and your braai accessories. Built for the fire and personalised with the engraving of your choice.',
      af: '\'n Vollengte voorskoot van swaardiens, 3 mm dik egte leer, met sakke vir jou foon, \'n drankie en jou braaibykomstighede. Gebou vir die vuur en verpersoonlik met die gravering van jou keuse.'
    },
    features: {
      en: ['Full-length genuine leather', 'Pockets for phone, drink and braai accessories', 'Heavy-duty 3 mm thick leather', 'Engraving of choice'],
      af: ['Vollengte egte leer', 'Sakke vir foon, drankie en braaibykomstighede', 'Swaardiens 3 mm dik leer', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name, a message or a logo of your choice.',
      af: 'Graveer \'n naam, \'n boodskap of \'n logo van jou keuse.'
    }
  },
  {
    id: 'mittens', slug: 'mittens',
    category: ['home'], featured: true,
    price: 1000,
    price_display: { en: 'N$1,000', af: 'N$1,000' },
    price_note: { en: 'per pair', af: 'per paar' },
    images: ['mittens', 'mittens-in-use'],
    alt: {
      en: ['Leather mitten engraved Beste Pappa hanging beside braai tools in front of a fire', 'Engraved leather mittens used to lift a cast-iron pot from the oven'],
      af: ['Leerhandskoen gegraveer met Beste Pappa wat langs braaigereedskap voor \'n vuur hang', 'Gegraveerde leerhandskoene wat gebruik word om \'n gietysterpot uit die oond te lig']
    },
    name: { en: 'Mittens', af: 'Oondhandskoene' },
    short: {
      en: 'Heavy-duty 3 mm leather for the braai and the kitchen.',
      af: 'Swaardiens 3 mm-leer vir die braai en die kombuis.'
    },
    description: {
      en: 'Heavy-duty mittens in genuine 3 mm thick leather, made for the braai and the kitchen. Sold as a pair and personalised with a name or message of your choice.',
      af: 'Swaardiens handskoene van egte, 3 mm dik leer, gemaak vir die braai en die kombuis. Verkoop per paar en verpersoonlik met \'n naam of boodskap van jou keuse.'
    },
    features: {
      en: ['Genuine 3 mm thick leather', 'Heavy duty, for braai and kitchen', 'Sold per pair', 'Engraving of choice'],
      af: ['Egte 3 mm dik leer', 'Swaardiens, vir braai en kombuis', 'Verkoop per paar', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name, a favourite verse or a personal message.',
      af: 'Graveer \'n naam, \'n gunstelingvers of \'n persoonlike boodskap.'
    }
  },
  {
    id: 'placemats', slug: 'placemats',
    category: ['home', 'corporate'], featured: true,
    price: 400,
    price_display: { en: 'N$400', af: 'N$400' },
    price_note: { en: 'per placemat · sold in sets', af: 'per plekmat · verkoop in stelle' },
    images: ['placemats', 'placemats-set'],
    alt: {
      en: ['Leather placemats engraved with an elephant, rhino and leopard on a wooden table', 'Set of leather placemats engraved with a buffalo, elephant, lion, rhino and leopard'],
      af: ['Leerplekmatte gegraveer met \'n olifant, renoster en luiperd op \'n houttafel', 'Stel leerplekmatte gegraveer met \'n buffel, olifant, leeu, renoster en luiperd']
    },
    name: { en: 'Placemats', af: 'Plekmatte' },
    short: {
      en: 'Waterproof 3 mm leather, 400 × 280 mm, engraved to your design.',
      af: 'Waterdigte 3 mm-leer, 400 × 280 mm, gegraveer volgens jou ontwerp.'
    },
    description: {
      en: 'Cut from genuine 3 mm thick leather and waterproof for everyday use, each 400 × 280 mm placemat can carry the engraving of your choice — from initials to detailed wildlife artwork. Sold in sets.',
      af: 'Gesny uit egte, 3 mm dik leer en waterdig vir alledaagse gebruik; elke plekmat van 400 × 280 mm kan die gravering van jou keuse dra — van voorletters tot gedetailleerde natuurkuns. Verkoop in stelle.'
    },
    features: {
      en: ['Genuine 3 mm thick leather', 'Waterproof', 'Size: 400 mm × 280 mm', 'Engraving of choice', 'Sold in sets'],
      af: ['Egte 3 mm dik leer', 'Waterdig', 'Grootte: 400 mm × 280 mm', 'Gravering van jou keuse', 'Verkoop in stelle']
    },
    customisation: {
      en: 'Choose initials, a family name, a logo or wildlife artwork for each placemat.',
      af: 'Kies voorletters, \'n familienaam, \'n logo of natuurkuns vir elke plekmat.'
    }
  },
  {
    id: 'coasters', slug: 'coasters',
    category: ['home', 'corporate'], featured: false,
    price: 550,
    price_display: { en: 'N$550', af: 'N$550' },
    price_note: { en: 'per set of 8', af: 'per stel van 8' },
    images: ['coasters', 'coasters-detail'],
    alt: {
      en: ['Round leather coasters engraved with family photographs on a wooden table beside a glass', 'Leather coasters engraved with portraits under wine glasses'],
      af: ['Ronde leerglasmatjies gegraveer met familiefoto\'s op \'n houttafel langs \'n glas', 'Leerglasmatjies gegraveer met portrette onder wynglase']
    },
    name: { en: 'Coasters', af: 'Glasmatjies' },
    short: {
      en: 'A set of eight waterproofed 3 mm leather coasters, 100 mm across.',
      af: '\'n Stel van agt waterdigte 3 mm-leerglasmatjies, 100 mm in deursnee.'
    },
    description: {
      en: 'A set of eight 100 mm coasters in genuine 3 mm thick leather, waterproofed for everyday use. Engrave them with names, a logo or even your favourite photographs.',
      af: '\'n Stel van agt glasmatjies van 100 mm, van egte 3 mm dik leer en waterdig gemaak vir alledaagse gebruik. Graveer dit met name, \'n logo of selfs jou gunstelingfoto\'s.'
    },
    features: {
      en: ['Genuine 3 mm thick leather', 'Waterproofed', '100 mm diameter', 'Sold as a set of 8', 'Engraving of choice'],
      af: ['Egte 3 mm dik leer', 'Waterdig gemaak', '100 mm deursnee', 'Verkoop as \'n stel van 8', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Send us names, a logo or your own photographs to engrave.',
      af: 'Stuur vir ons name, \'n logo of jou eie foto\'s om te graveer.'
    }
  },
  {
    id: 'wine-caddy', slug: 'single-wine-caddy',
    category: ['home', 'corporate'], featured: false,
    price: 750,
    price_display: { en: 'N$750', af: 'N$750' },
    images: ['wine-caddy', 'wine-caddy-branded'],
    alt: {
      en: ['Leather Single Wine Caddy engraved with a company logo, beside a bottle of red wine and a glass', 'Tan leather wine caddy branded with a safari company logo, with a bottle of wine and two glasses'],
      af: ['Leer- enkel-wynhouer gegraveer met \'n maatskappylogo, langs \'n bottel rooiwyn en \'n glas', 'Taankleurige leerwynhouer met \'n safarimaatskappy se logo, met \'n bottel wyn en twee glase']
    },
    name: { en: 'Single Wine Caddy', af: 'Enkel-wynhouer' },
    short: {
      en: 'Genuine 3 mm leather with a heavy-duty finish, for one bottle.',
      af: 'Egte 3 mm-leer met \'n swaardiens afwerking, vir een bottel.'
    },
    description: {
      en: 'A single-bottle wine caddy in genuine 3 mm leather with heavy-duty finishing. Engraved with a name, message or company logo, it turns a good bottle into a memorable gift.',
      af: '\'n Wynhouer vir een bottel, van egte 3 mm-leer met \'n swaardiens afwerking. Gegraveer met \'n naam, boodskap of maatskappylogo, maak dit van \'n goeie bottel \'n onvergeetlike geskenk.'
    },
    features: {
      en: ['Genuine 3 mm leather', 'Heavy-duty finishing', 'Holds a single bottle', 'Engraving of choice'],
      af: ['Egte 3 mm-leer', 'Swaardiens afwerking', 'Hou een bottel', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name, a message or your company logo.',
      af: 'Graveer \'n naam, \'n boodskap of jou maatskappylogo.'
    }
  },
  {
    id: 'ammo-bag-50', slug: '50-round-ammo-bag',
    category: ['field'], featured: false,
    price: 1000,
    price_display: { en: 'N$1,000', af: 'N$1,000' },
    images: ['ammo-bag-50', 'ammo-bag-50-open'],
    alt: {
      en: ['Closed tan leather 50 Round Ammo Bag engraved with a buffalo and a name, on a wooden table', 'Open 50 Round Ammo Bag showing its fitted cartridge holder'],
      af: ['Toe taankleurige leer-ammunisiesak vir 50 rondtes, gegraveer met \'n buffel en \'n naam, op \'n houttafel', 'Oop ammunisiesak vir 50 rondtes wat die passende patroonhouer wys']
    },
    name: { en: '50 Round Ammo Bag', af: 'Ammunisiesak vir 50 Rondtes' },
    short: {
      en: 'The Vrijheid flagship since 2019 — a unique patented design for all calibres.',
      af: 'Die Vrijheid-vlagskip sedert 2019 — \'n unieke gepatenteerde ontwerp vir alle kalibers.'
    },
    description: {
      en: 'Our flagship product since 2019. A unique patented design in genuine leather that holds 50 rounds, made for all calibre sizes and engraved to your choice.',
      af: 'Ons vlagskipproduk sedert 2019. \'n Unieke, gepatenteerde ontwerp in egte leer wat 50 rondtes hou, gemaak vir alle kalibergroottes en gegraveer na jou keuse.'
    },
    features: {
      en: ['Genuine leather', 'Unique patented design', 'Flagship product since 2019', 'All calibre sizes welcome', 'Engraving of choice'],
      af: ['Egte leer', 'Unieke gepatenteerde ontwerp', 'Vlagskipproduk sedert 2019', 'Alle kalibergroottes welkom', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Tell us your calibre and the engraving you would like.',
      af: 'Laat weet ons jou kaliber en die gravering wat jy verlang.'
    }
  },
  {
    id: 'ammo-pouch-7', slug: '7-round-ammo-pouch',
    category: ['field'], featured: false,
    price: 750,
    price_display: { en: 'N$750', af: 'N$750' },
    images: ['ammo-pouch-7'],
    alt: {
      en: ['Two tan leather 7 Round Ammo Pouches with press-stud flaps, one engraved, on a hide'],
      af: ['Twee taankleurige leer-ammunisiesakkies vir 7 rondtes met drukknoopflappe, een gegraveer, op \'n vel']
    },
    name: { en: '7 Round Ammo Pouch', af: 'Ammunisiesakkie vir 7 Rondtes' },
    short: {
      en: 'Genuine 3 mm leather with a belt loop — seven rounds within easy reach.',
      af: 'Egte 3 mm-leer met \'n gordellus — sewe rondtes binne maklike bereik.'
    },
    description: {
      en: 'A compact pouch in genuine 3 mm leather with a belt loop, keeping seven rounds within easy reach. A unique patented design and a Vrijheid flagship product since 2019.',
      af: '\'n Kompakte sakkie van egte 3 mm-leer met \'n gordellus, wat sewe rondtes binne maklike bereik hou. \'n Unieke, gepatenteerde ontwerp en \'n Vrijheid-vlagskipproduk sedert 2019.'
    },
    features: {
      en: ['Genuine 3 mm leather', 'Belt loop', 'Unique patented design', 'Flagship product since 2019', 'Engraving of choice'],
      af: ['Egte 3 mm-leer', 'Gordellus', 'Unieke gepatenteerde ontwerp', 'Vlagskipproduk sedert 2019', 'Gravering van jou keuse']
    },
    customisation: {
      en: 'Engrave a name, initials or a logo on the flap.',
      af: 'Graveer \'n naam, voorletters of \'n logo op die flap.'
    }
  }
];
