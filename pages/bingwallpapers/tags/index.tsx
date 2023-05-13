import { Fragment } from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'

export default function T({ tags }: { tags: [string, number][] }) {
  const max = tags.reduce((a, c) => Math.max(a, c[1]), 0)
  const min = tags.reduce((a, c) => Math.min(a, c[1]), max)
  const tagFields = tags.map((l, i) => {
    const normalised = (l[1] - min) / (max - min) * 4.2 + 1
    return (
      <Fragment key={i}><Link prefetch={false} href={`/bingwallpapers/tags/${l[0]}`} className="px-2 py-1 leading-[3rem] rounded-md text-gray-300 hover:bg-slate-700 hover:text-white" style={{"fontSize": normalised+"em"}}>{l[0]}</Link> </Fragment>
    )
  })

  const pageTitle = `Tags - Bing Wallpapers - ${process.env.NEXT_PUBLIC_NAME}`
  return (
    <Layout pageTitle={pageTitle}>
      <h1 className="text-3xl mb-2 text-white mx-4 md:mx-0">Tags - Bing Wallpapers</h1>
      <div className="mx-2 md:mx-0">{tagFields}</div>
    </Layout>
  )
}

export async function getStaticProps() {
  const tags = {"acrylic paint":58,"adaptation":349,"aeolian landform":59,"aerial photography":352,"afterglow":272,"agriculture":102,"algae":59,"alps":243,"american larch":47,"ancient history":111,"animal migration":45,"annual plant":104,"aqua":72,"aquatic plant":60,"arcade":43,"arch":222,"arch bridge":40,"archaeological site":38,"archipelago":42,"architecture":616,"arctic":157,"arctic ocean":52,"arroyo":48,"art":589,"arthropod":40,"arête":62,"astronomical object":164,"astronomy":74,"atmosphere":514,"atmospheric phenomenon":457,"aurora":43,"autumn":284,"azure":225,"badlands":177,"bank":299,"batholith":84,"bay":415,"bayou":59,"beach":220,"beak":306,"bear":36,"beauty":38,"bedrock":176,"bight":49,"biome":370,"birch family":44,"bird":337,"bird of prey":49,"blossom":45,"blue":426,"boat":77,"body of water":307,"bog":39,"botany":208,"branch":378,"brick":38,"bridge":183,"building":659,"butte":40,"byzantine architecture":42,"calm":367,"canal":48,"canidae":59,"canyon":71,"cape":214,"caribbean":61,"carmine":39,"carnivore":157,"castle":87,"cave":63,"ceiling":73,"celestial event":48,"channel":170,"chaparral":64,"church":54,"chute":69,"circle":181,"cirque":41,"city":727,"cityscape":306,"classical architecture":55,"cliff":306,"close-up":161,"cloud":1372,"coast":650,"coastal and oceanic landforms":434,"colorfulness":81,"column":53,"condominium":53,"conifer":150,"coquelicot":67,"coral reef":38,"cove":117,"cow-goat family":52,"crater lake":41,"creek":94,"crop":69,"crowd":37,"cumulus":293,"darkness":232,"dawn":418,"daylighting":38,"daytime":131,"deciduous":204,"deer":41,"desert":39,"design":85,"dome":44,"downtown":137,"dusk":610,"earth":81,"ecoregion":319,"electric blue":328,"electricity":49,"erosion":100,"escarpment":201,"estate":63,"estuary":48,"evening":1003,"event":244,"evergreen":57,"eye":41,"facade":208,"farm":97,"fashion accessory":47,"fault":71,"fawn":220,"feather":113,"felidae":53,"fell":430,"festival":60,"field":277,"finch":36,"fir":80,"fireworks":37,"fish":65,"fixed link":49,"fjord":101,"flightless bird":44,"floodplain":53,"flower":457,"flowering plant":312,"fluid":44,"fluvial landforms of streams":129,"fog":132,"font":137,"forest":710,"formation":539,"fractal art":47,"freezing":425,"frost":178,"fun":84,"fur":118,"fête":40,"galaxy":40,"garden":140,"geological phenomenon":485,"geology":518,"glacial lake":85,"glacial landform":223,"glacier":143,"glass":87,"graphics":78,"grass":955,"grass family":158,"grassland":653,"grazing":50,"green":305,"groundcover":171,"grove":137,"harbor":68,"haze":74,"headland":299,"heat":67,"herbaceous plant":90,"herd":80,"highland":411,"hill":995,"hill station":343,"historic site":236,"history":146,"holiday":71,"holy places":53,"home":65,"horizon":1055,"horn":54,"house":322,"human settlement":196,"ice":231,"ice cap":192,"illustration":153,"infrastructure":74,"inlet":306,"insect":65,"interior design":65,"intrusion":40,"invertebrate":88,"island":182,"islet":71,"jungle":271,"klippe":246,"lacustrine plain":38,"lagoon":49,"lake":645,"lake district":232,"land lot":62,"landmark":401,"landscape":2606,"landscaping":71,"larch":92,"lavender":42,"leaf":396,"leisure":218,"light":278,"light fixture":52,"lighting":131,"line":78,"liquid":73,"livestock":52,"loch":223,"macro photography":242,"magenta":148,"mammal":194,"marine biology":130,"marine invertebrates":41,"marine mammal":78,"marsh":57,"massif":334,"meadow":255,"medieval architecture":109,"metal":129,"meteorological phenomenon":253,"metropolis":252,"metropolitan area":241,"midnight":170,"mineral spring":43,"mist":180,"mixed-use":131,"modern art":43,"monument":62,"moraine":52,"morning":544,"moss":105,"mount scenery":242,"mountain":1021,"mountain pass":56,"mountain range":665,"mountain river":111,"mountain village":60,"mountainous landforms":442,"national park":609,"natural environment":436,"natural landscape":1852,"natural material":62,"nature":1198,"nature reserve":344,"neighbourhood":47,"night":658,"non-vascular land plant":65,"nonbuilding structure":163,"northern hardwood forest":225,"nunatak":40,"ocean":760,"old-growth forest":257,"orange":130,"organism":457,"outcrop":268,"outer space":46,"owl":39,"paint":81,"painting":262,"palace":39,"panorama":156,"pasture":210,"path":58,"pattern":337,"peninsula":124,"people in nature":136,"perching bird":103,"perennial plant":101,"petal":158,"photography":604,"pier":43,"pine":76,"pine family":155,"pink":70,"place of worship":102,"plain":277,"plant":1982,"plant community":138,"plant stem":362,"plantation":150,"plateau":211,"polar ice cap":69,"pollen":45,"pollinator":44,"pond":149,"prairie":292,"precipitation":38,"promontory":241,"purple":102,"rainforest":172,"rapid":82,"ravine":68,"real estate":74,"recreation":177,"rectangle":57,"red":136,"red sky at morning":121,"reef":59,"reflection":1005,"reservoir":354,"residential area":75,"resort town":37,"ridge":362,"riparian forest":126,"riparian zone":107,"river":561,"river delta":40,"road":299,"road surface":49,"rock":1105,"rodent":47,"roof":165,"ruins":80,"rural area":254,"safari":76,"sand":115,"savanna":112,"science":94,"screenshot":42,"sculpture":36,"sea":736,"sea cave":37,"sea ice":37,"seabird":83,"shadow":97,"shore":296,"shrub":160,"shrubland":94,"silhouette":39,"skerry":54,"sky":2262,"skyline":192,"skyscraper":104,"slope":227,"snout":227,"snow":425,"soil":168,"songbird":56,"sound":290,"space":246,"spire":75,"sport venue":40,"spring":282,"spruce-fir forest":136,"star":89,"state park":191,"steppe":126,"still life photography":58,"stock photography":124,"stream":170,"street":70,"street light":37,"subshrub":44,"suburb":83,"summit":258,"sun":50,"sunlight":574,"sunrise":548,"sunset":568,"symmetry":347,"tail":167,"tarn":131,"temperate broadleaf and mixed forest":304,"temperate coniferous forest":139,"temple":52,"terrain":496,"terrestrial animal":422,"terrestrial plant":249,"textile":67,"thoroughfare":49,"tide":90,"tints and shades":167,"tourism":829,"tourist attraction":390,"tower":195,"tower block":121,"town":169,"tradition":37,"trail":44,"travel":91,"tree":1677,"tributary":45,"tropical and subtropical coniferous forests":266,"tropics":239,"trunk":310,"tundra":254,"turquoise":57,"twig":265,"underwater":100,"unesco world heritage site":46,"universe":68,"urban area":229,"urban design":156,"vacation":328,"valdivian temperate rain forest":190,"valley":373,"vascular plant":126,"vegetation":344,"vehicle":119,"vertebrate":300,"village":162,"violet":37,"visual arts":203,"wadi":81,"walkway":60,"wall":67,"water":1326,"water bird":86,"water feature":143,"water resources":392,"water transportation":54,"watercolor paint":67,"watercourse":536,"watercraft":64,"waterfall":116,"waterway":176,"wave":370,"wetland":151,"whiskers":100,"wilderness":517,"wildflower":330,"wildlife":1026,"wind":134,"wind wave":246,"window":138,"wing":130,"winter":727,"wood":463,"woodland":292,"woody plant":311,"working animal":40,"world":779,"yellow":179}

  const t = Object.entries(tags)
  //   .filter((l: any) => l[1] > 35)

  // const a = t.reduce((a: any, c: any) => {
  //     a[c[0]] = c[1]
  //     return a
  //   }, {})
  // console.log(JSON.stringify(a))

  return {
    props: {
      tags: t,
    }
  }
}
