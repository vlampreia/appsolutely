//
//  HTTP.swift
//  PaaS
//
//  Created by Mark Larah on 11/10/2014.
//  Copyright (c) 2014 Team Goat. All rights reserved.
//

import Foundation

public class HTTP {
    
    var URL: NSURL? = nil;
    
    init (_URL: String) {
        self.URL = NSURL(string: _URL);
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
    
}