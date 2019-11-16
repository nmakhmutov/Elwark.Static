import { Test, TestingModule } from '@nestjs/testing';
import { CountryController } from './country.controller';

describe('CountryController', () => {
    let app: TestingModule;

    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [CountryController],
        }).compile();
    });

    describe('root', () => {
        it('should return "object"', () => {
            const appController = app.get<CountryController>(CountryController);
            expect(typeof appController).toBe('object');
        });
    });
});
