import { User } from '../models/user.model';
export const UsersMockData: any[] = [

    {id: 1, secondName: 'Лазарев', firstName: 'Глеб'},
    {id: 2, secondName: 'Данилин', firstName: 'Всеволод'},
    {id: 3, secondName: 'Демин', firstName: 'Сергей'},
    {id: 4, secondName: 'Чепурной', firstName: 'Никита'},
    {id: 5, secondName: 'Щелкунов', firstName: 'Олег'},
    {id: 6, secondName: 'Королевский', firstName: 'Александр'},
    {id: 7, secondName: 'Лотко', firstName: 'Александр'},
    {id: 8, secondName: 'Бурханов', firstName: 'Роман'},
    {id: 9, secondName: 'Кумаков', firstName: 'Дмитрий'},
    {id: 10, secondName: 'Чернов', firstName: 'Евгений'},
    {id: 11, secondName: 'Будкин', firstName: 'Виталий'},
    {id: 12, secondName: 'Куприн', firstName: 'Василий', thirdName: 'ДНО'},
    {id: 13, secondName: 'Половинкин', firstName: 'и', thirdName: 'Даниил'},
    {id: 14, secondName: 'Романов', firstName: 'Виктор'},
    {id: 15, secondName: 'Старорусов', firstName: 'Станислав'},
    {id: 16, secondName: 'Трейаль', firstName: 'Всеволод'},
    {id: 17, secondName: 'Матвеев', firstName: 'Александр'},
    {id: 18, secondName: 'Коршунова', firstName: 'Екатерина'},
    {id: 19, secondName: 'Охонько', firstName: 'Михаил'},
    {id: 20, secondName: 'Шевелев', firstName: 'Алексей'},
    {id: 21, secondName: 'Шатурный', firstName: 'Дмитрий'},
  
  ].map((item, i) => ({
    id: i+1,
    name: item.firstName+ ' ' +item.secondName,
    firstName: item.firstName,
    secondName: item.secondName,
    thirdName: item.thirdName,
    email: '',
    active: true,
  }))