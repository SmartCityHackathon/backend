import * as request from 'supertest';
import { version } from '../package.json';
import { app } from '../src/app';

export default describe('About route', () => {
    it('should get app version', () =>
        request(app)
            .get(`/about`)
            .set('Authorization', 'ahoj')
            .expect(200)
            .expect({ version }));
});
