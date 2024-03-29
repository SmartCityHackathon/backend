import * as request from 'supertest';
import { SuperTest, Test } from 'supertest';
import { app } from '../src/app';
import { createAuthenticatedRequest } from './testUtils/createAuthenticatedRequest';
import { MOCK_FIRST_CHILD_ID, MOCK_PARENT_CHILDREN_CALENDAR_2019_09 } from '../src/mockData';

export default describe('postCalendarGoing route', () => {
    const sendData = { going: { '2019-09-03': false, '2019-09-07': true } };
    const expectedData = MOCK_PARENT_CHILDREN_CALENDAR_2019_09;
    expectedData[0].going['2019-09-03'] = false;
    expectedData[0].going['2019-09-07'] = true;

    it('should not post user calendar because of unauthorized', () =>
        request(app)
            .post(`/calendar/going/${MOCK_FIRST_CHILD_ID}`)
            .expect(401));

    it('should edit user calendar going info', (done) =>
        createAuthenticatedRequest(request(app), (req: SuperTest<Test>, token: string) => {
            req
                .post(`/calendar/going/${MOCK_FIRST_CHILD_ID}`)
                .send(sendData)
                .set('Authorization', token)
                .expect(200)
                .end((err: any) => {
                    if (err) {
                        done(err);
                        return;
                    }
                    req
                        .get(`/calendar/going`)
                        .set('Authorization', token)
                        .expect(200)
                        .expect({
                            children: expectedData,
                        })
                        .end(done);
                });
        }));
});