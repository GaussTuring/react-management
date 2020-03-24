import Mock from 'mockjs'

Mock.mock("/mock/ranks", {
    "data|10": [{
        "no|+1": 1,
        "uid": "@cname",
        "avatar": "@image",
        "victory": "@integer(100,1000)",
        "defeat": "@integer(100,1000)",
        "rate_win": "@float(0,1)"
    }]
})

Mock.mock("/mock/updates", {
    "updateList|10": [{
        "id|+1": 1,
        "label": "@date(yyyy-MM-dd HH:mm)",
        "description": "@paragraph"
    }]
})

Mock.mock('/mock/heros', {
    "heroList|15": [{
        'id|+1': 1,
        "key|+1": 1,
        'heroName': '@first',
        "age": '@integer(0,120)',
        "sex|1": ['男', '女'],
        "region": "@province",
        "description": '@paragraph'
    }]
})

Mock.mock('/mock/getHeroDetail', {
    "hero": {
        'id': '@integer(0,100)',
        'heroName': '@first',
        "age": '@integer(0,120)',
        "sex|1": ['男', '女'],
        "region": "@province",
        "description": '@paragraph'
    }
})

Mock.mock(/\/mock\/searchHero/, {
    "hero": [{
        'id': '@integer(0,100)',
        "key": 1,
        'heroName': '@first',
        "age": '@integer(0,120)',
        "sex|1": ['男', '女'],
        "region": "@province",
        "description": '@paragraph'
    }]
})

Mock.mock('/mock/revisions', {
    "versions|20": [{
        'vid|+1': 1,
        "key|+1": 1,
        "update_date": "@date(yyyy-MM-dd HH:mm)",
        "description": "@paragraph"
    }]
})

Mock.mock('/mock/equipments', {
    'equipments|20': [{
        'id|+1': 1,
        'key|+1': 1,
        'eqname': '@cword(4,10)',
        'icon': '@image',
        'attribute|3': ['@integer(0,6)'],
        'description': '@cparagraph(2,4)',
        "effect": '@cparagraph(2,4)'
    }]
})