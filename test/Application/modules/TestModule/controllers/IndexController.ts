import { Controller, GetMapping, RequestMapping, Session, HttpServletSession } from '../../../../../src';

@Controller
@RequestMapping('/test')
export class IndexController {
    @GetMapping('/')
    public index(@HttpServletSession session: Session<{user: string}>) {
        session.user = 'zhangsan'
        return session
    }

    @GetMapping
    public test(@HttpServletSession session: Session<{user: string}>) {
        return session
    }
}