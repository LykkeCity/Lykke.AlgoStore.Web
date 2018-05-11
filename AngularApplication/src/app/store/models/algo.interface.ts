import { AlgoMetadata } from './algo-metadata.model';

export interface Algo {
    Id?: string;
    AlgoId?: string;
    ClientId?: string;
    Name?: string;
    Description?: string;
    Date?: string;
    Status?: string;
    Author?: string;
    UsersCount?: string;
    Rating?: number;
    RatedUsersCount?: number;
    Data?: string;
    AlgoMetaDataInformation?: AlgoMetadata;
}

export function getAlgos() {
  return JSON.parse('[{"ClientId":"1ed89482-2108-4b39-97ed-61ca1f4df59c","Rating":5.0,"RatedUsersCount":1,"UsersCount":164,"Id":"54169b36-a51c-4f8c-8d17-09a45f0f4bc6","Name":"Dafi Demo Dummy Algo","Description":"Test Dummy algo","Date":"2018-08-05 14:29:54","Status":null,"Author":"Dafi Test"},{"ClientId":"1ed89482-2108-4b39-97ed-61ca1f4df59c","Rating":4.0,"RatedUsersCount":1,"UsersCount":414,"Id":"b134bb3d-7045-4bab-99fe-81cd2db7509e","Name":"Dafi Demo Moving Average Cross Algo","Description":"Test MAC algo","Date":"2018-27-04 06:46:54","Status":null,"Author":"Dafi Test"},{"ClientId":"1ed89482-2108-4b39-97ed-61ca1f4df59c","Rating":3.67,"RatedUsersCount":24,"UsersCount":453,"Id":"e58e1980-3edc-4946-a1e3-afba576070b3","Name":"Dafi Demo MACD Trend Algo","Description":"Test MACD Trend Algo","Date":"2018-27-04 06:49:32","Status":null,"Author":"Dafi Test"},{"ClientId":"1ed89482-2108-4b39-97ed-61ca1f4df59c","Rating":6.0,"RatedUsersCount":1,"UsersCount":236,"Id":"ecaa51b2-2012-4385-844e-c4752fde6af6","Name":"NewFilTestMetaData13","Description":"Plamen NewFlow Test 9999","Date":"2018-13-03 15:14:32","Status":null,"Author":"Dafi Test"},{"ClientId":"201097ab-0de5-46f2-a0a3-b655dee0dba5","Rating":6.0,"RatedUsersCount":2,"UsersCount":96,"Id":"80f9872d-4e71-4229-9313-08537b087e9a","Name":"Test Tosh Algo","Description":"Test Test","Date":"2018-13-03 08:07:41","Status":null,"Author":"Todor Atanasov"},{"ClientId":"637ed5dd-54e2-42fa-bcfd-0454fb54f761","Rating":3.48,"RatedUsersCount":23,"UsersCount":123,"Id":"58abdc20-2cd5-42b8-a56f-dffd8270ff88","Name":"My First Algo","Description":"Description of the Algo","Date":"2018-09-03 15:38:57","Status":null,"Author":"Todor Ivanov"},{"ClientId":"637ed5dd-54e2-42fa-bcfd-0454fb54f761","Rating":3.11,"RatedUsersCount":27,"UsersCount":326,"Id":"ebcdb86b-4d60-4f1d-9289-3c627f6436be","Name":"Second Algo","Description":"Second Test Algo","Date":"2018-09-03 15:43:44","Status":null,"Author":"Todor Ivanov"},{"ClientId":"71a4471d-7b4f-4264-93c6-235fd1eda4ad","Rating":6.0,"RatedUsersCount":1,"UsersCount":259,"Id":"950db850-b53c-40e0-8fd9-dd49f632b70e","Name":"Dummy Algo - Iliyan Test","Description":"Dummy Algo - Iliyan Test","Date":"2018-13-04 13:37:18","Status":null,"Author":"Elian Kurtenkov 3"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":6.0,"RatedUsersCount":1,"UsersCount":68,"Id":"07be3d21-c0e0-4ca2-ae02-435d474d4406","Name":"ug8wzjooagxu2","Description":"mkqv1o6lags1i","Date":"2018-19-03 13:04:29","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":3.77,"RatedUsersCount":26,"UsersCount":39,"Id":"0b630ed3-aab8-4a81-b65f-8a106acf18ca","Name":"5p0qffl6itrlv","Description":"vrk2tftgxer2y","Date":"2018-07-03 13:18:50","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":252,"Id":"0e5b10a2-d091-408e-85e4-0d7189ffdab0","Name":"z0ryfsanili5u","Description":"ti8mkjksrgoli","Date":"2018-27-03 07:27:09","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":394,"Id":"0fde9a65-1fb5-4bb1-9fda-f4cbce8d9ecc","Name":"0k69ajjvjpau1","Description":"whpbym3gqx301","Date":"2018-20-03 16:23:51","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":444,"Id":"199b5fc0-fdee-4bb7-81f3-21cac5daa10e","Name":"TestFilDafi313","Description":"Plamen NewFlow Test 1","Date":"2018-13-03 14:08:05","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":136,"Id":"1adeb22d-7cc7-4a21-95f3-184b0be243ab","Name":"umwla3py2m1c7","Description":"m0e8gdwzkqlmx","Date":"2018-27-03 13:40:13","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":58,"Id":"2087df9c-8bd7-4566-b079-82620044033b","Name":"g83374sr6yz10","Description":"90tqrawxtx6rc","Date":"2018-21-03 12:08:59","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":462,"Id":"25bc22de-0132-4dfe-97ae-26eec538eb05","Name":"ntu143ssl6co1","Description":"hb531al6qjmr4","Date":"2018-21-03 12:28:19","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":94,"Id":"2dd11fd6-ec84-4db0-8cba-4692cbde1fcf","Name":"nhyqmxg1cgyh5","Description":"r5q4af87l7wl9","Date":"2018-21-03 15:37:55","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":388,"Id":"2f874e3f-ff34-4ac8-ab6c-2495d6e5d4f4","Name":"1iei8qqqrc7ht","Description":"y95xc7q74fttd","Date":"2018-27-03 12:52:25","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":455,"Id":"466a1f65-ae43-49e7-8bbe-2aa42ecaf960","Name":"sptbri1x1x7mu","Description":"rsx64y028dc4h","Date":"2018-02-04 07:27:22","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":19,"Id":"4bfa79d5-b8fd-4581-ba3d-873785bf4da7","Name":"bzs15bt7jxb3s","Description":"ymmpr65psbyfx","Date":"2018-21-03 11:13:55","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":295,"Id":"4f839782-d649-4394-a876-a11d3ad343c5","Name":"205wedqyv12ua","Description":"5qkrlvgg5czww","Date":"2018-29-03 15:13:37","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":346,"Id":"5122d361-cfec-4c83-9a19-4792ae7b49ca","Name":"9qx7hegczwpaw","Description":"salvzwaxug1qx","Date":"2018-20-03 14:44:49","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":6.0,"RatedUsersCount":1,"UsersCount":280,"Id":"56f08a78-bd30-4563-9bfd-f6da52f4675d","Name":"mzno7oq3fw0n2","Description":"vsd9vtvu3uv7x","Date":"2018-26-03 10:01:22","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":3.65,"RatedUsersCount":23,"UsersCount":193,"Id":"6419badc-4a96-41f9-bb05-5d00e2591327","Name":"ydsactgn9u41n","Description":"59hbpdo9xh7kj","Date":"2018-07-03 11:01:13","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":3.12,"RatedUsersCount":25,"UsersCount":288,"Id":"67440cb7-493c-49c6-ab1c-74c86054af6e","Name":"mq13psr30iucl","Description":"ofxauvdow2520","Date":"2018-07-03 12:16:56","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":6.0,"RatedUsersCount":1,"UsersCount":70,"Id":"6c49289e-9dd0-4fcc-8547-8d44b9d839c2","Name":"TestFilDafi312","Description":"Plamen NewFlow Test 1","Date":"2018-12-03 12:11:40","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":3.35,"RatedUsersCount":20,"UsersCount":440,"Id":"77ce95b7-3c11-45a9-874e-1cf3c2b081e5","Name":"umg43zu600eoj","Description":"r64nenti2in90","Date":"2018-07-03 09:42:27","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":240,"Id":"7b818503-70f4-49e1-b505-74bcc15bd415","Name":"0ha58j11tfn2v","Description":"fk0sj3fnmyraz","Date":"2018-22-03 08:35:31","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":162,"Id":"7dd4c41c-68ca-44e7-9886-5f09a15d1721","Name":"2tp1x1uy70tn9","Description":"p4c816h5zzmo9","Date":"2018-26-03 08:59:11","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":3.59,"RatedUsersCount":22,"UsersCount":202,"Id":"7e0a8c31-535a-43ef-9f98-ae41f4f84185","Name":"cas0cl6ouk76i","Description":"tnvjztepa9akk","Date":"2018-07-03 12:25:39","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":6.0,"RatedUsersCount":1,"UsersCount":260,"Id":"82330179-8fb5-432a-88ff-f4f4644216e8","Name":"fa3dfnz5ryk98","Description":"r49ntiv84ee90","Date":"2018-26-03 08:41:55","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":10,"Id":"855895a4-325b-47ed-8aac-b9284eed57d2","Name":"unpbn6abtqo2q","Description":"fzpe4rqzw043g","Date":"2018-17-04 13:46:48","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":6.0,"RatedUsersCount":1,"UsersCount":106,"Id":"8e9d5596-92f9-46fe-9f31-747604870d47","Name":"ssxthqxn4z2yj","Description":"8yecihwm0ss9h","Date":"2018-21-03 11:56:12","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":235,"Id":"9284f32e-1503-4775-9b08-4663ab3288a3","Name":"uk0k9jwupxtjt","Description":"912bkin3sammx","Date":"2018-23-03 11:42:05","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":34,"Id":"9466c059-8efe-491c-8ec0-6456210356b8","Name":"kgazjysy7dp4h","Description":"00vbocrolehtj","Date":"2018-09-03 13:04:59","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":236,"Id":"948b1509-3072-4c7e-8db1-d67287d97e02","Name":"TestFil315","Description":"TestFil315","Date":"2018-15-03 09:38:01","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":274,"Id":"a001eca6-25bf-4e01-8bf3-93fa222978c9","Name":"xp957qkk4x1na","Description":"nvlh0cr0pnfo4","Date":"2018-21-03 09:49:24","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":58,"Id":"ab0f9a21-1a87-497e-bd77-28c4d9832a68","Name":"du138bga657hr","Description":"qnakgx11bn23h","Date":"2018-21-03 13:06:05","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":3.81,"RatedUsersCount":32,"UsersCount":267,"Id":"b612e741-b3ac-4e07-ad46-03608c7b9050","Name":"6gmf3j4730yry","Description":"235e6hdchy8c7","Date":"2018-07-03 11:56:17","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":361,"Id":"baf16df9-0a5a-4a2b-970d-4bc920be4c32","Name":"nrbg0ndb15lb7","Description":"tjb6hyadrkef2","Date":"2018-20-03 09:17:23","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":28,"Id":"c0fa206d-db5f-48a2-a3be-3e910ff7b1b7","Name":"p1gmjhz4o47k4","Description":"fl3khm2pb6xsc","Date":"2018-23-03 13:33:33","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":35,"Id":"c5f4582f-8358-49b8-a60e-4a306b39e698","Name":"e4xjrreoyf4lu","Description":"bu1hd01q12r4b","Date":"2018-29-03 14:47:04","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":192,"Id":"c674b44c-6cfc-467b-820e-750698a9541c","Name":"vvunm5mn0kjm5","Description":"ydnhvsi5oex42","Date":"2018-20-03 16:40:32","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":34,"Id":"cddbf250-d483-4f9e-95af-abbb721bc921","Name":"TestForAlgo77777","Description":"Plamen777777777","Date":"2018-13-03 14:58:49","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":3.38,"RatedUsersCount":21,"UsersCount":354,"Id":"d2abe583-0ef8-44b2-be82-91a7a414bba3","Name":"b71qi2skuj0qf","Description":"cd2ljwagzcrc7","Date":"2018-07-03 13:37:09","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":4.0,"RatedUsersCount":1,"UsersCount":351,"Id":"d4e361d7-561c-4418-959f-21db8319886b","Name":"fh6ukjwnl1ity","Description":"8vn14s2kugj7t","Date":"2018-28-03 10:43:09","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":309,"Id":"db7ef617-8054-46ee-9d8c-fac6679f8811","Name":"4uls39qv55o8a","Description":"1p73xr0bsdco5","Date":"2018-20-03 16:08:03","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":46,"Id":"de4fdd7f-6046-4921-a4dd-70622c172ccc","Name":"ko9hrecm1qzzl","Description":"uw18ytvgzwu7u","Date":"2018-21-03 15:18:02","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":406,"Id":"e2d7b7e7-4100-4f3f-ac2c-27a2fbe2d0a0","Name":"5edgadtjijyh8","Description":"eql7a1a5is9yx","Date":"2018-21-03 11:26:45","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":1.0,"RatedUsersCount":1,"UsersCount":476,"Id":"e615c573-6b32-4421-b4d6-caa34a7a7bd5","Name":"um0wm44hmhck8","Description":"zg9hvf5zhikjg","Date":"2018-08-03 09:53:05","Status":null,"Author":"FilMihaylov"},{"ClientId":"e658abfc-1779-427c-8316-041a2deb1db8","Rating":0.0,"RatedUsersCount":0,"UsersCount":361,"Id":"f2512159-7528-47b5-bb4f-55718f3679cf","Name":"1zwescdg7a21u","Description":"vgb0zo1su1ulz","Date":"2018-21-03 12:46:30","Status":null,"Author":"FilMihaylov"}]')
}
