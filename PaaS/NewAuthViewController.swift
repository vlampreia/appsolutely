//
//  NewAuthViewController.swift
//  PaaS
//
//  Created by Bartlomiej Siemieniuk on 12/10/2014.
//  Copyright (c) 2014 Team Goat. All rights reserved.
//

import UIKit
import AVFoundation

class NewAuthViewController: UIViewController, AVCaptureMetadataOutputObjectsDelegate {
    
    var callbackQueue: dispatch_queue_t? {
        didSet {
            println("did set callback queue")
        }
    }
    var captureSession: AVCaptureSession?
    var device: AVCaptureDevice?
    var input: AVCaptureDeviceInput?
    var output: AVCaptureMetadataOutput?
    var previewLayer: AVCaptureVideoPreviewLayer?
    
    func setupAVStuff() {
        callbackQueue = dispatch_queue_create("hi", nil)
        captureSession = AVCaptureSession()
        device = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo)
        input = AVCaptureDeviceInput(device: device!, error: nil)
        captureSession!.addInput(input!)
        output = AVCaptureMetadataOutput()
        captureSession?.addOutput(output!)
        output!.setMetadataObjectsDelegate(self, queue: callbackQueue!)
        output!.metadataObjectTypes = [AVMetadataObjectTypeQRCode] as [AnyObject]!
        previewLayer = AVCaptureVideoPreviewLayer(session: captureSession!)
        previewLayer!.videoGravity = AVLayerVideoGravityResizeAspectFill
    }

    override func viewDidLoad() {
        super.viewDidLoad()
    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
        
        setupAVStuff()
        
        captureSession!.startRunning()
        
        previewLayer?.frame = self.view.bounds
        self.view.layer.addSublayer(previewLayer)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func captureOutput(captureOutput: AVCaptureOutput!, didOutputMetadataObjects metadataObjects: [AnyObject]!, fromConnection connection: AVCaptureConnection!) {
        println("I hate computers.")
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue!, sender: AnyObject!) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
