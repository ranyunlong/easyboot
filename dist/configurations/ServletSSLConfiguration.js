"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServletSSLConfiguration {
    constructor(configuration) {
        if (typeof configuration !== 'object' || Array.isArray(configuration))
            return;
        Object.keys(configuration).forEach((key) => {
            this[key] = configuration[key];
        });
    }
}
exports.ServletSSLConfiguration = ServletSSLConfiguration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmxldFNTTENvbmZpZ3VyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29uZmlndXJhdGlvbnMvU2VydmxldFNTTENvbmZpZ3VyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFhLHVCQUF1QjtJQUNoQyxZQUFZLGFBQXVDO1FBQy9DLElBQUksT0FBTyxhQUFhLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDO1lBQUUsT0FBTztRQUM5RSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQWtDLEVBQUUsRUFBRTtZQUN0RSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2xDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQXVCSjtBQTdCRCwwREE2QkMifQ==