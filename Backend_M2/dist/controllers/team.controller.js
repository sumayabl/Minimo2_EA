"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const getTeams = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield team_1.default.find({}).populate('users');
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
const getTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield team_1.default.find({ "_id": req.params.id }).populate('users');
        return res.status(200).json(results);
    }
    catch (err) {
        return res.status(404).json(err);
    }
});
/*const addUserToTeam = async (req: Request, res: Response) => {
    let teamName = req.params.teamName;
    console.log(req.params.id);
    console.log(req.params.teamName);
    try{
        const results = await User.findOne({"_id": req.params._id});
        const team = new Team ({ "name": teamName, "User": results});
        await team.save();

        return res.status(200).json(results);
    } catch (err) {
        return res.status(404).json(err);
    }
}*/
const addUserToTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let teamName = req.params.teamName;
    let userId = req.body.id;
    let userName = req.body.name;
    let userEmail = req.body.email;
    let userPhone = req.body.phone;
    let userPassword = req.body.password;
    let s = yield user_1.default.findOne({ name: userName });
    if (!s) {
        let user = new user_1.default({ "name": userName, "email": userEmail, "phone": userPhone, "password": userPassword });
        yield user.save().then((data) => {
            s = data;
        });
    }
    yield team_1.default.updateOne({ "name": teamName }, { $addToSet: { users: s === null || s === void 0 ? void 0 : s._id } }).then(data => {
        if (data.nModified == 1) {
            res.status(201).send({ message: 'User added successfully' });
        }
        else {
            res.status(409).json('User already exists!!!');
        }
    }).catch((err) => {
        console.log("error ", err);
        res.status(500).json(err);
    });
});
const addTeam = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const team = new team_1.default({
        "name": req.body.name,
        "users": []
    });
    team.save().then((data) => {
        return res.status(201).json(data);
    }).catch((err) => {
        return res.status(500).json(err);
    });
});
exports.default = { getTeams, getTeam, addUserToTeam, addTeam };
