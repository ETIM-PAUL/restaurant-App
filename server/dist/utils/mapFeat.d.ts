import { JwtService } from '@nestjs/jwt';
import { Location } from '../restaurants/schemas/restaurants.schema';
export default class MAPFeature {
    static setRestaurantGeoLocation(address: any): Promise<Location>;
    static upload(files: any): Promise<unknown>;
    static deleteImages(images: any): Promise<unknown>;
    static assignJwtToken(userId: string, jwtService: JwtService): Promise<string>;
}
