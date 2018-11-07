import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const zimis = [
      {id:1,
      dada:[{id:1,midi: '光年', question: '一种计量天体距离的单位', answer: 'GN', zb: 2, zongheng: 1},
            {id:2,midi: '杜可风', question: '香港的一位著名电影人', answer: 'DKF', zb: 10, zongheng: 1},
            {id:3,midi: '火花', question: '火柴盒上的标签', answer: 'HH', zb: 14, zongheng: 1},
            {id:4,midi: '红楼梦', question: '清代一部长篇小说，又名《石头记》', answer: 'HLM', zb: 27, zongheng: 1},
            {id:5,midi: '云破月来花弄影', question: '张先的一句词', answer: 'YPYLHNY', zb: 30, zongheng: 1},
            {id:6,midi: '响马', question: '旧时称在路上抢劫旅客的强盗', answer: 'XM', zb: 46, zongheng: 1},
            {id:7,midi: '白兰地', question: '用葡萄、苹果等发酵蒸馏制成的酒，含酒精量较高', answer: 'BLD', zb: 50, zongheng: 1},
            {id:8,midi: '大观园', question: '《石头记》里的一个地方', answer: 'DGY', zb: 57, zongheng: 1},
            {id:9,midi: '铁树', question: '一种常绿灌木，常用其开花来比喻事情非常罕见或极难实现', answer: 'TSh', zb: 62, zongheng: 1},
            {id:10,midi: '哇哈哈', question: '一首儿童歌曲', answer: 'WHH', zb: 65, zongheng: 1},
            {id:11,midi: '大食', question: '唐代起对阿拉伯帝国的称呼', answer: 'DSh', zb: 73, zongheng: 1},
            {id:12,midi: '王道', question: '我国古代政治哲学中指君主以仁义治天下的政策', answer: 'WD', zb: 78, zongheng: 1},
            {id:13,midi: '不打自招', question: '指自动承认罪行', answer: 'BDZZh', zb: 80, zongheng: 1},
            {id:14,midi: '克格勃', question: '原苏联“国家安全委员会”俄文缩写的音译', answer: 'KGB', zb: 86, zongheng: 1},
            {id:15,midi: '风雅颂', question: '《诗经》的组成部分，六艺中的三种', answer: 'FYS', zb: 93, zongheng: 1},
            {id:16,midi: '李杜', question: '对唐朝两大杰出诗人的合称', answer: 'LD', zb: 0, zongheng: 0},
            {id:17,midi: '光风霁月', question: '雨过天晴时风清月明的景象，比喻开阔的胸襟和坦白的心地', answer: 'GFJY', zb: 2, zongheng: 0},
            {id:18,midi: '梅花三弄', question: '一首琵琶曲，又名三落', answer: 'MHSN', zb: 5, zongheng: 0},
            {id:19,midi: '鹤顶红', question: '武侠小说中常出现的一种极品毒药', answer: 'HDH', zb: 7, zongheng: 0},
            {id:20,midi: '如梦令', question: '词牌名', answer: 'RML', zb: 19, zongheng: 0},
            {id:21,midi: '云南白药', question: '一中成药名，可以活血消肿、止血定痛', answer: 'YNBY', zb: 30, zongheng: 0},
            {id:22,midi: '花无缺', question: '《绝代双娇》中的一个人物', answer: 'HWQ', zb: 34, zongheng: 0},
            {id:23,midi: '影响', question: '指对人对事所起的作用', answer: 'YX', zb: 36, zongheng: 0},
            {id:24,midi: '马大哈', question: '指粗心大意的人', answer: 'MDH', zb: 47, zongheng: 0},
            {id:25,midi: '地铁', question: '现在各大城市流行的一种交通工具', answer: 'DT', zb: 52, zongheng: 0},
            {id:26,midi: '树大招风', question: '比喻因名气太引人注意或惹人嫉妒而生出是非', answer: 'ShDZhF', zb: 63, zongheng: 0},
            {id:27,midi: '哈萨克', question: '我国少数民族之一，主要分布在新疆、甘肃', answer: 'HSK', zb: 66, zongheng: 0},
            {id:28,midi: '王勃', question: '初唐四杰之一', answer: 'WB', zb: 78, zongheng: 0},
            {id:29,midi: '打坐', question: '我国古代一种养生健身法，也是僧道修行的方法', answer: 'DZ', zb: 81, zongheng: 0},
            {id:30,midi: '格格', question: '满语中对公主的称呼', answer: 'GG', zb: 87, zongheng: 0}
            ]
          }
          ];
    return {zimis};
  }
}