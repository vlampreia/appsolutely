//
//  Logic.swift
//  PaaS
//
//  Created by Bartlomiej Siemieniuk on 12/10/2014.
//  Copyright (c) 2014 Team Goat. All rights reserved.
//

import Foundation
import UIKit
import CoreData
import AudioToolbox


struct QRCode {
    var action: Int?
    var hash1: String?
    var userSecret: String?
    var RQR: String?
}

extension String  {
    var md5: String! {
        let str = self.cStringUsingEncoding(NSUTF8StringEncoding)
            let strLen = CC_LONG(self.lengthOfBytesUsingEncoding(NSUTF8StringEncoding))
            let digestLen = Int(CC_MD5_DIGEST_LENGTH)
            let result = UnsafeMutablePointer<CUnsignedChar>.alloc(digestLen)
            
            CC_MD5(str!, strLen, result)
            
            var hash = NSMutableString()
            for i in 0..<digestLen {
                hash.appendFormat("%02x", result[i])
            }
            
            result.destroy()
            
            return String(format: hash)
    }
}

public class Logic {
    
    var _hash1: String?
    var _deviceToken: String?
    var _userSecret: String?
    var _RQR: String?
    
    init () {
//        prinln("sending to server...");
//        loginToServer();
    }
    
    func parseQRCode (QRCodeStr: String) -> QRCode? {
        
        let QRArr = QRCodeStr.componentsSeparatedByString("|");
        
        if QRArr.count != 4 {
            return nil;
        }
        
        let QR = QRCode(action: QRArr[0].toInt(), hash1: QRArr[1], userSecret: QRArr[2], RQR: QRArr[3]);
        
        return QR;
        
    }
    
    func loginToServer (hash1: String, secret: String, RQR: String) {
        println("sending to server");
        
//        let appDelegate: AppDelegate = UIApplication.sharedApplication().delegate as AppDelegate
//        let context: NSManagedObjectContext? = appDelegate.managedObjectContext
//        let entityName: String = "BaseSettings"
//        let myEntityDescription = NSEntityDescription.entityForName(entityName, inManagedObjectContext: context!)
//        var myObject = MyObject(entity: myEntityDescription, insertIntoManagedObjectContext: context!)
//        
        
        var req = HTTP(path: "/login");
        
        var deviceID = "a8f5f167f44f4964e6c998dee827666y";
        
        var hash2 = "\(deviceID)\(hash1)".md5;
        
        var bodyData = "hash=\(hash2)&user_secret=\(secret)&rqr=\(RQR)";
        
        
        req.Post(bodyData, { (response: String?) in
            if (response != nil) {
                println(response!);                
            }
        });
    }
    
    
    
}
