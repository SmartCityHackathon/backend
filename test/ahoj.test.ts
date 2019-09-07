import * as request from 'supertest';
import { app } from '../src/app';

export default describe('Ahoj route', () => {
    it('should get ahoj Ninja json', () =>
        request(app)
            .get(`/ahoj`)
            .expect(200)
            .expect({
                ahoj: 'Ninja!',
            }));
});
