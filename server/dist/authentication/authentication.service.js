"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schema/user.schema");
const bcrypt = require("bcryptjs");
const mapFeat_1 = require("../utils/mapFeat");
const jwt_1 = require("@nestjs/jwt");
let AuthenticationService = class AuthenticationService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async createUser(createUserDto) {
        const { name, email, password, address, contactNo } = createUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await this.userModel.create({
                name,
                email,
                password: hashedPassword,
                contactNo,
                address,
            });
            const token = await mapFeat_1.default.assignJwtToken(user.id, this.jwtService);
            return { token };
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException('Email already registered');
            }
            console.log(error);
        }
    }
    async loginUser(loginUserDto) {
        const { email, password } = loginUserDto;
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user) {
            throw new common_1.UnauthorizedException('No user Found');
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new common_1.UnauthorizedException('Invalid email account or password');
        }
        user.password = undefined;
        const userdetails = user;
        console.log(userdetails);
        const token = await mapFeat_1.default.assignJwtToken(user.id, this.jwtService);
        return ({ token, userdetails });
    }
};
AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.default.Model, jwt_1.JwtService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map