import { getModelToken } from '@nestjs/mongoose'
import {Test, TestingModule} from '@nestjs/testing'
import { RestaurantsService } from './restaurants.service'
import { Restaurant } from './schemas/restaurants.schema'
import {Model} from 'mongoose'

const mockRestaurant = {"order": [],
"menu": [],
"_id": "622a1107e114690d50e45388",
"location": [
  {
    "type": "Point",
    "coordinates": [
      8.33079,
      4.98901
    ],
    "formattedAddress": "Essien Town Road, Calabar Municipal, Cross River, NG",
    "city": "Calabar Municipal",
    "state": "Cross River",
    "zipcode": "",
    "country": "NG"
  }
],
"images": [
  {
    "Location": "https://restaurant-api-nestjs.s3.us-east-2.amazonaws.com/restaurants/20211007_095854_1646924157675.jpg",
    "Bucket": "restaurant-api-nestjs",
    "Key": "restaurants/20211007_095854_1646924157675.jpg",
    "ETag": "\"68c27affe786e7a5f6427bd1bd733e73-2\""
  }
],
"category": "Dinning",
"address": "Essien Town, Calabar, Cross River State",
"contactNo": 8141170608,
"email": "dannic@gmail.com",
"orderOut": true,
"reservations": false,
"officialChef": "Chef Ibok",
"description": "We have all kind of meals",
"name": "Dannic Restaurants",}

const mockRestaurantService 
= { find: jest.fn(),
create: jest.fn(),
findById: jest.fn()}

describe('RestaurantService', () => {

  let service: RestaurantsService;
  let model: Model<Restaurant>
  beforeEach(async () => {

    const module: TestingModule = await  Test.createTestingModule({
      providers:[
        RestaurantsService,
        {
          provide: getModelToken(Restaurant.name),
          useValue: mockRestaurantService
        }
      ]
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService)
    model = module.get<Model<Restaurant>>(getModelToken(Restaurant.name))
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe ('findAll', () => {
    it('should get all restaurants', async () => {
      jest.spyOn(model, 'find').mockImplementationOnce(
        () => ({
          limit: () => ({
            skip:jest.fn().mockResolvedValue([mockRestaurant]),
          }),
  } as any));
  const restaurants =  await service.findAll({ keyword: 'restaurant'});
  expect (restaurants).toEqual([mockRestaurant]);
})
})

// describe ('create', () => {
//   const newRestaurant = {
//     category: 'Fast Fodd',
//   }
// })

// describe('findById', () => {

// })
})
