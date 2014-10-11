//
//  ViewController.swift
//  PaaS
//
//  Created by Mark Larah on 11/10/2014.
//  Copyright (c) 2014 Team Goat. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        let captureSession = AVCaptureSession();
        captureSession.sessionPreset = AVCaptureSessionPresetLow
        let devices = AVCaptureDevice.devices()
        println(devices)
        
        
        var req = HTTP(_URL: "http://www.stackoverflow.com");
        req.Get({ (response: String?) in
            if (response != nil) {
                println(response!);
            }
        });
        
        
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

