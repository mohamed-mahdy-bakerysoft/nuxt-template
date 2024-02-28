import * as demo1 from '@/assets/images/demo/demoImage1.png'
import * as demo2 from '@/assets/images/demo/demoImage2.png'
import * as demo3 from '@/assets/images/demo/demoImage3.png'
import * as notfound from '@/assets/images/demo/notFound.png'

// const imagesDemo = [demo1.default, demo2.default, demo3.default, notfound.default]
const nfts = [
  {
    // image: imagesDemo[0],
    // name: 'Vietnam Heritage Tour 2024',
    riskLevel: 17,
    credit: 4.8,
    avgROI: 13,
    investors: 0,
    ownerName: 'vietmyusa'
  },
  {
    // image: imagesDemo[1],
    // name: 'China Qin Dynasty Expedition',
    riskLevel: 14,
    credit: 4.2,
    avgROI: 13,
    investors: 0,
    ownerName: 'vietmyusa'
  },
  {
    // image: imagesDemo[2],
    // name: 'Japan Edo Art',
    riskLevel: 20,
    credit: 4.3,
    avgROI: 14,
    investors: 0,
    ownerName: 'vietmyusa'
  },
  {
    // image: imagesDemo[3],
    // name: 'Unnamed FNFT Project',
    riskLevel: 0,
    credit: 0,
    avgROI: 0,
    investors: 0,
    ownerName: '-'
  }
]
const offerings = [
  {
    description: 'Breakfast'
  },
  {
    description: 'Merch'
  },
  {
    description: 'Coaching Session'
  },
  {
    description: 'Donate'
  }
]
const contents = [
  {
    // image: nfts[0].image,
    // name: nfts[0].name,
    ownerName: nfts[0].ownerName,
    // description: `An immersive journey through the vibrant and diverse landscapes of Dong Thap, Ha Giang, and Hoi An, promising an enriching experience for art enthusiasts and cultural explorers alike. This unique series invites participants to delve into the heart of Vietnam's artistic tapestry, combining the country's rich history with its contemporary art scene.`,
    episodes: [
      {
        // image:
        //   'https://i1.wp.com/travelhanoi.org/wp-content/uploads/ma-pi-leng-pass-hagiang-vietnam.jpg?resize=800%2C506&ssl=1',
        name: 'Ha Giang Loop',
        ownerName: 'vietmyusa',
        views: '100000',
        reactions: '1000',
        offerings
        //video: 'https://assets.fluxnft.space/qin-dynasty.mp4'
      },
      {
        // image:
        //   'https://vietnam.travel/sites/default/files/inline-images/292-Qu%E1%BA%A3ng%20Nam-tmluong50%40gmail.com-thuyen%20hoa.jpg',
        name: 'Ancient Town Hoi An',
        ownerName: 'vietmyusa',
        views: '100000',
        reactions: '1000',
        offerings
        //video: 'https://assets.fluxnft.space/qin-dynasty.mp4'
      }
    ]
  },
  {
    // image: nfts[1].image,
    // name: nfts[1].name,
    ownerName: nfts[1].ownerName,
    // description: `An epic historical adventure series that takes audiences on a mesmerizing journey through the rich tapestry of ancient China during the Qin Dynasty. Set against the backdrop of the tumultuous third century BCE, the series unfolds as a thrilling narrative of exploration, political intrigue, and cultural discovery.`,
    episodes: [
      {
        // image:
        //   'h`ttps://www.thoughtco.com/thmb/lFCw--JwTuzortpIX8enWFLwMZ4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/200458941-001-56a142335f9b58b7d0bd89b5.jpg',
        name: 'The Great Wall',
        ownerName: 'vietmyusa',
        views: '100000',
        reactions: '1000',
        offerings
        //video: 'https://assets.fluxnft.space/qin-dynasty.mp4'
      },
      {
        // image:
        //   'https://www.chinadaily.com.cn/world/images/2017xivisitsfinlandandus/attachement/jpg/site1/20170408/d8cb8a3c66c01a526f6014.jpg',
        name: 'Qin Emperor Relics',
        ownerName: 'vietmyusa',
        views: '100000',
        reactions: '1000',
        offerings
        //video: 'https://assets.fluxnft.space/qin-dynasty.mp4'
      }
    ]
  },
  {
    // image: nfts[2].image,
    // name: nfts[2].name,
    ownerName: nfts[2].ownerName,
    // description: `Invites audiences to step back in time to the vibrant and culturally rich Edo period, a golden age of artistic expression in Japanese history. This captivating series unfolds against the backdrop of the bustling metropolis of Edo (modern-day Tokyo), immersing viewers in the world of masterful artisans, samurai, and courtesans. The narrative centers around the lives of talented artists who thrived in this era, exploring the intricate world of ukiyo-e woodblock prints, sumptuous kabuki performances, and the delicate craftsmanship of traditional ceramics. As viewers follow the intertwining stories of these artists, the series not only offers a visual feast of Edo aesthetics but also delves into the societal and political complexities of the time. With meticulous attention to historical accuracy and a deep appreciation for the beauty of Japanese art, "Japan Edo Art" is a mesmerizing journey that celebrates the enduring legacy of creativity and innovation that emerged during this extraordinary period in Japanese history.`,
    episodes: [
      {
        // image:
        //   'https://cdn.thecollector.com/wp-content/uploads/2023/04/ukiyo-e-censorship.jpg?width=1400&quality=70',
        name: 'Edo Period Art Styles',
        ownerName: 'vietmyusa',
        views: '100000',
        reactions: '1000',
        offerings
        //video: 'https://assets.fluxnft.space/qin-dynasty.mp4'
      },
      {
        // image: 'https://www.historyoffighting.com/resources/Samurai.jpg',
        name: 'The Honorary Samurais',
        ownerName: 'vietmyusa',
        views: '100000',
        reactions: '1000',
        offerings
        //video: 'https://assets.fluxnft.space/qin-dynasty.mp4'
      }
    ]
  },
  {
    // image: nfts[3].image,
    // name: nfts[3].name,
    ownerName: nfts[3].ownerName,
    episodes: [
      {
        // image: imagesDemo[0],
        name: 'Foo Episode 1',
        ownerName: 'vietmyusa',
        views: '100000',
        reactions: '1000',
        offerings
        //video: 'https://assets.fluxnft.space/qin-dynasty.mp4'
      },
      {
        // image: imagesDemo[1],
        name: 'Foo Episode 2',
        ownerName: 'vietmyusa',
        views: '100000',
        reactions: '1000',
        offerings
        //video: 'https://assets.fluxnft.space/qin-dynasty.mp4'
      }
    ]
  }
]
export default { nfts, contents }
