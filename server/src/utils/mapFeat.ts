import { JwtService } from '@nestjs/jwt';
import { S3 } from 'aws-sdk';
import nodeGeoCoder = require('node-geocoder');
import { Location } from '../restaurants/schemas/restaurants.schema';

//get address coordinates
export default class MAPFeature {
  static async setRestaurantGeoLocation(address) {
    try {
      const options = {
        provider: process.env.GEOCODER_PROVIDER,
        httpAdapter: 'https',
        apiKey: process.env.GEOCODER_API_KEY,
        formatter: null,
      };
      const geoCoder = nodeGeoCoder(options);

      const loc = await geoCoder.geocode(address);

      const location: Location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
      };
      return location;
    } catch (error) {
      console.log('ERROR', error.message);
    }
  }

  //upload images
  static async upload(files) {
    return new Promise((resolve, reject) => {
      const s3 = new S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      });

      const images = [];

      files.forEach(async (file) => {
        const uniqueFile = file.originalname.split('.');
        const random = Date.now();

        const fileName = `${uniqueFile[0]}_${random}.${uniqueFile[1]}`;

        const params = {
          Bucket: `${process.env.AWS_S3_BUCKET}/restaurants`,
          Key: fileName,
          Body: file.buffer,
        };

        const uploadImage = await s3.upload(params).promise();

        images.push(uploadImage);

        if (images.length === files.length) {
          resolve(images);
        }
      });
    });
  }

  // Delete Images
  static async deleteImages(images) {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const imageKeys = images.map((image) => {
      return {
        Key: image.Key,
      };
    });

    const params = {
      Bucket: `${process.env.AWS_S3_BUCKET}`,
      Delete: {
        Objects: imageKeys,
        Quiet: false,
      },
    };

    return new Promise((resolve, reject) => {
      s3.deleteObjects(params, function (err, data) {
        if (err) {
          reject(false);
        } else {
          resolve(true);
        }
      });
    });
  }

  static async assignJwtToken(
    userId: string,
    jwtService: JwtService,
  ): Promise<string> {
    const payload = { id: userId };
    const token = await jwtService.sign(payload);

    return token;
  }
}
