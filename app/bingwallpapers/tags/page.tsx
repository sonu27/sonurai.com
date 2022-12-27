import { Fragment } from 'react'
import Link from 'next/link'

export default function Page() {
  const tags = getTags()
  const max = tags.reduce((a, c) => Math.max(a, c[1]), 0)
  const min = tags.reduce((a, c) => Math.min(a, c[1]), max)
  const tagFields = tags.map((l, i) => {
    const normalised = (l[1] - min) / (max - min) * 5 + 1
    return (
      <Fragment key={i}><Link prefetch={false} href={`/bingwallpapers/tags/${l[0]}`} className="px-2 py-1 leading-[3rem] rounded-md text-gray-300 hover:bg-slate-700 hover:text-white" style={{"fontSize": normalised+"em"}}>{l[0]}</Link> </Fragment>
    )
  })

  const pageTitle = `Tags - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">Tags - Bing Wallpapers</h1>
      <div className="mx-2 md:mx-0">{tagFields}</div>
    </>
  )
}

function getTags() {
  const tags = {
    'acrylic paint': 56,
    adaptation: 343,
    'aeolian landform': 49,
    'aerial photography': 324,
    afterglow: 231,
    agriculture: 93,
    algae: 54,
    alps: 232,
    'american larch': 47,
    'ancient history': 93,
    'animal migration': 41,
    'annual plant': 86,
    aqua: 66,
    'aquatic plant': 53,
    arch: 191,
    'arch bridge': 38,
    'archaeological site': 37,
    archipelago: 40,
    architecture: 605,
    arctic: 140,
    'arctic ocean': 45,
    arroyo: 43,
    art: 492,
    arthropod: 37,
    'arête': 49,
    'astronomical object': 146,
    astronomy: 62,
    atmosphere: 475,
    'atmospheric phenomenon': 428,
    aurora: 39,
    autumn: 266,
    azure: 193,
    badlands: 160,
    bank: 282,
    batholith: 70,
    bay: 389,
    bayou: 55,
    beach: 208,
    beak: 284,
    bedrock: 153,
    bight: 47,
    biome: 343,
    'birch family': 41,
    bird: 319,
    'bird of prey': 46,
    "bird's-eye view": 246,
    blue: 407,
    boat: 70,
    'body of water': 281,
    botany: 195,
    branch: 358,
    bridge: 168,
    building: 592,
    butte: 37,
    calm: 342,
    canal: 45,
    canidae: 55,
    canyon: 71,
    cape: 195,
    caribbean: 55,
    carnivore: 150,
    castle: 77,
    cave: 61,
    ceiling: 60,
    'celestial event': 43,
    channel: 155,
    chaparral: 56,
    church: 47,
    chute: 63,
    circle: 158,
    cirque: 37,
    city: 644,
    cityscape: 277,
    'classical architecture': 42,
    cliff: 288,
    'close-up': 146,
    cloud: 1253,
    coast: 601,
    'coastal and oceanic landforms': 409,
    colorfulness: 81,
    column: 47,
    condominium: 45,
    conifer: 121,
    coquelicot: 54,
    cove: 109,
    'cow-goat family': 48,
    'crater lake': 38,
    creek: 88,
    crop: 62,
    cumulus: 236,
    darkness: 197,
    dawn: 376,
    daytime: 117,
    deciduous: 182,
    deer: 38,
    design: 82,
    dome: 37,
    downtown: 123,
    dusk: 540,
    earth: 80,
    ecoregion: 279,
    'electric blue': 274,
    electricity: 39,
    erosion: 90,
    escarpment: 181,
    estate: 58,
    estuary: 46,
    evening: 890,
    event: 203,
    evergreen: 45,
    eye: 38,
    facade: 168,
    farm: 90,
    'fashion accessory': 41,
    fault: 63,
    fawn: 210,
    feather: 100,
    felidae: 51,
    fell: 393,
    festival: 52,
    field: 248,
    fir: 66,
    fish: 60,
    'fixed link': 42,
    fjord: 101,
    'flightless bird': 38,
    floodplain: 49,
    flower: 428,
    'flowering plant': 269,
    fluid: 37,
    'fluvial landforms of streams': 120,
    fog: 125,
    font: 106,
    forest: 659,
    formation: 510,
    'fractal art': 42,
    freezing: 357,
    frost: 155,
    fun: 72,
    fur: 103,
    'fête': 40,
    garden: 116,
    'geological phenomenon': 451,
    geology: 485,
    'glacial lake': 78,
    'glacial landform': 185,
    glacier: 124,
    glass: 74,
    graphics: 68,
    grass: 851,
    'grass family': 148,
    grassland: 595,
    grazing: 44,
    green: 297,
    groundcover: 145,
    grove: 125,
    harbor: 59,
    haze: 66,
    headland: 271,
    heat: 60,
    'herbaceous plant': 73,
    herd: 75,
    highland: 380,
    hill: 894,
    'hill station': 310,
    'historic site': 206,
    history: 123,
    holiday: 62,
    'holy places': 44,
    home: 60,
    horizon: 940,
    horn: 49,
    house: 285,
    'human settlement': 187,
    ice: 216,
    'ice cap': 154,
    illustration: 134,
    infrastructure: 73,
    inlet: 280,
    insect: 61,
    'interior design': 55,
    invertebrate: 83,
    island: 168,
    islet: 69,
    jungle: 244,
    klippe: 230,
    lagoon: 46,
    lake: 583,
    'lake district': 196,
    'land lot': 58,
    landmark: 370,
    landscape: 2394,
    landscaping: 59,
    larch: 80,
    lavender: 41,
    leaf: 386,
    leisure: 185,
    light: 263,
    'light fixture': 40,
    lighting: 125,
    line: 78,
    liquid: 63,
    livestock: 46,
    loch: 197,
    'macro photography': 223,
    magenta: 120,
    mammal: 188,
    'marine biology': 121,
    'marine invertebrates': 38,
    'marine mammal': 73,
    marsh: 53,
    massif: 288,
    meadow: 243,
    'medieval architecture': 90,
    metal: 112,
    'meteorological phenomenon': 233,
    metropolis: 232,
    'metropolitan area': 225,
    midnight: 148,
    'mineral spring': 39,
    mist: 167,
    'mixed-use': 111,
    'modern art': 40,
    monument: 50,
    moraine: 44,
    morning: 509,
    moss: 100,
    'mount scenery': 242,
    mountain: 936,
    'mountain pass': 56,
    'mountain range': 589,
    'mountain river': 100,
    'mountain village': 48,
    'mountainous landforms': 405,
    'national park': 609,
    'natural environment': 411,
    'natural landscape': 1668,
    'natural material': 48,
    nature: 1155,
    'nature reserve': 331,
    neighbourhood: 39,
    night: 599,
    'non-vascular land plant': 63,
    'nonbuilding structure': 153,
    'northern hardwood forest': 202,
    ocean: 687,
    'old-growth forest': 238,
    orange: 120,
    organism: 435,
    outcrop: 244,
    'outer space': 39,
    owl: 38,
    paint: 69,
    painting: 237,
    palace: 37,
    panorama: 139,
    pasture: 190,
    path: 48,
    pattern: 284,
    peninsula: 112,
    'people in nature': 114,
    'perching bird': 96,
    'perennial plant': 96,
    petal: 135,
    photography: 603,
    pier: 41,
    pine: 68,
    'pine family': 139,
    pink: 66,
    'place of worship': 86,
    plain: 261,
    plant: 1828,
    'plant community': 128,
    'plant stem': 317,
    plantation: 133,
    plateau: 179,
    'polar ice cap': 58,
    pollen: 39,
    pollinator: 39,
    pond: 139,
    prairie: 258,
    promontory: 229,
    purple: 92,
    rainforest: 161,
    rapid: 77,
    ravine: 64,
    'real estate': 67,
    recreation: 155,
    rectangle: 45,
    red: 128,
    'red sky at morning': 102,
    reef: 50,
    reflection: 921,
    reservoir: 308,
    'residential area': 68,
    ridge: 329,
    'riparian forest': 114,
    'riparian zone': 99,
    river: 550,
    'river delta': 40,
    road: 270,
    'road surface': 41,
    rock: 1010,
    rodent: 44,
    roof: 136,
    ruins: 75,
    'rural area': 240,
    safari: 71,
    sand: 106,
    savanna: 103,
    science: 80,
    screenshot: 40,
    sea: 691,
    'sea cave': 36,
    seabird: 77,
    shadow: 77,
    shore: 276,
    shrub: 135,
    shrubland: 79,
    silhouette: 36,
    skerry: 52,
    sky: 2092,
    skyline: 176,
    skyscraper: 97,
    slope: 169,
    snout: 212,
    snow: 371,
    soil: 144,
    songbird: 51,
    sound: 251,
    space: 233,
    spire: 65,
    'sport venue': 38,
    spring: 269,
    'spruce-fir forest': 123,
    star: 79,
    'state park': 191,
    steppe: 107,
    'still life photography': 49,
    'stock photography': 111,
    stream: 160,
    street: 59,
    subshrub: 37,
    suburb: 71,
    summit: 223,
    sun: 45,
    sunlight: 542,
    sunrise: 494,
    sunset: 522,
    symmetry: 290,
    tail: 150,
    tarn: 119,
    'temperate broadleaf and mixed forest': 276,
    'temperate coniferous forest': 127,
    temple: 45,
    terrain: 471,
    'terrestrial animal': 387,
    'terrestrial plant': 210,
    textile: 65,
    thoroughfare: 47,
    tide: 88,
    'tints and shades': 135,
    tourism: 768,
    'tourist attraction': 354,
    tower: 174,
    'tower block': 103,
    town: 163,
    trail: 38,
    travel: 71,
    tree: 1523,
    tributary: 43,
    'tropical and subtropical coniferous forests': 242,
    tropics: 217,
    trunk: 281,
    tundra: 221,
    turquoise: 57,
    twig: 234,
    underwater: 92,
    'unesco world heritage site': 37,
    universe: 59,
    'urban area': 220,
    'urban design': 134,
    vacation: 307,
    'valdivian temperate rain forest': 174,
    valley: 332,
    'vascular plant': 116,
    vegetation: 319,
    vehicle: 116,
    vertebrate: 288,
    village: 139,
    'visual arts': 167,
    wadi: 72,
    walkway: 51,
    wall: 61,
    water: 1232,
    'water bird': 77,
    'water feature': 133,
    'water resources': 367,
    'water transportation': 46,
    'watercolor paint': 65,
    watercourse: 508,
    watercraft: 58,
    waterfall: 111,
    waterway: 162,
    wave: 341,
    wetland: 138,
    whiskers: 96,
    wilderness: 485,
    wildflower: 306,
    wildlife: 956,
    wind: 111,
    'wind wave': 218,
    window: 115,
    wing: 119,
    winter: 634,
    wood: 396,
    woodland: 268,
    'woody plant': 296,
    world: 736,
    yellow: 174
  }


  const t = Object.entries(tags)
    // .filter((l: any) => l[1] > 35)

  // const a = t.reduce((a: any, c: any) => {
  //     a[c[0]] = c[1]
  //     return a
  //   }, {})
  // console.log(a)

  return t
}
