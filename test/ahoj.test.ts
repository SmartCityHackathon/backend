import * as request from 'supertest';
import { app } from '../src/app';

export default describe('About route', () => {
    it('should get ahoj Ninja', () =>
        request(app)
            .get(`/ahoj`)
            .expect(200)
            .expect({
                ahoj: 'Ninja!',
            }));
});
