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
const admin_1 = __importDefault(require("../models/admin"));
const license_1 = __importDefault(require("../models/license"));
function registerAdmin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let admin = req.body;
        let checkEmail = yield admin_1.default.findOne({ "email": admin.email });
        let checkPhone = yield admin_1.default.findOne({ "phone": admin.phone });
        if (checkEmail)
            return res.status(409).json({ code: 409, message: "This email already exists" });
        else if (checkPhone)
            return res.status(410).json({ code: 410, message: "This phone number already exists" });
        else {
            try {
                let u = new admin_1.default({
                    "name": admin.name,
                    "email": admin.email,
                    "cif": admin.cif,
                    "address": admin.address,
                    "postalCode": admin.postalCode,
                    "phone": admin.phone,
                    "password": admin.password
                });
                u.save().then((data) => {
                    return res.status(201).json(data);
                });
            }
            catch (err) {
                return res.status(500).json(err);
            }
        }
    });
}
function checklicense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let license = req.params.licenseCode;
        let checkLicense = yield license_1.default.findOne({ "licenseCode": license });
        let data;
        if (checkLicense)
            return res.status(202).json(data = true);
        else {
            return res.status(409).json(data = false);
        }
    });
}
const newLicense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let licenseCode = new license_1.default({
            "licenseCode": req.body.licenseCode,
        });
        licenseCode.save().then((data) => {
            return res.status(201).json(data);
        });
    }
    catch (err) {
        return res.status(500).json(err);
    }
});
exports.default = { registerAdmin, checklicense, newLicense };
