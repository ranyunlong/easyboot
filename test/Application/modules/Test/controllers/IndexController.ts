import { Controller, GetMapping, RequestMapping, Session, ServletSession } from '../../../../../src';

@Controller
@RequestMapping('/test')
export class IndexController {
    @GetMapping('/')
    public index(@ServletSession session: Session<{user: string}>) {
        session.user = 'zhangsan'
        return session
    }

    @GetMapping
    public test(@ServletSession session: Session<{user: string}>) {
        return session
    }
}