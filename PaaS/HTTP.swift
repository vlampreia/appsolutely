//
//  HTTP.swift
//  PaaS
//
//  Created by Mark Larah on 11/10/2014.
//  Copyright (c) 2014 Team Goat. All rights reserved.
//

import Foundation

public class HTTP {
    
    let server = "http://transitivepylons.no-ip.biz";
  // let server = "http://httpbin.org/";
    //let server = "soyuz-II"
    
    var URL: NSURL? = nil;
    
    init (path: String) {
        self.URL = NSURL(string: server + path);
    }
    
    func Get (callback: ((String?) -> Void)!) {
        
        if (self.URL == nil) {
            
            callback(nil);
            
        } else {
        
            let request = NSURLRequest(URL: self.URL!);
        
            NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {(response, data, error) in
                callback(NSString(data: data, encoding: NSUTF8StringEncoding))
            }
            
        }
    }
    
    func Post (data: String, callback: ((String?) -> Void)!) {
        if (self.URL == nil) {
        
            callback(nil);
        
        } else {
        
        let request = NSMutableURLRequest(URL: self.URL!);
            request.HTTPMethod = "POST";
            let httpdata = (data as NSString).dataUsingEncoding(NSUTF8StringEncoding)
            
            request.HTTPBody = httpdata;
            println("printing before crash")
        NSURLConnection.sendAsynchronousRequest(request, queue: NSOperationQueue.mainQueue()) {(response, data, error) in
            callback(NSString(data: data, encoding: NSUTF8StringEncoding))
        }
        
    }
}
}