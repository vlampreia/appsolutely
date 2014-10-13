//
//  NewAuthViewController.swift
//  PaaS
//
//  Created by Bartlomiej Siemieniuk on 12/10/2014.
//  Copyright (c) 2014 Team Goat. All rights reserved.
//

import UIKit
import AVFoundation
import AudioToolbox

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
    
    var imgOverlay: UIImageView?
    
    
    var tick: UIImageView?

    
    var parent:MainController?;
    
    var timesSent = 0;
    
    
    var AuthLogic: Logic?
    
    func setDeletage(parent:MainController) {
        self.parent = parent;
    }
    
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
        self.addGestures()

    }
    
    override func viewDidAppear(animated: Bool) {
        super.viewDidAppear(animated)
        
        setupAVStuff()
        
        captureSession!.startRunning()
        
        previewLayer?.frame = self.view.bounds
        self.view.layer.addSublayer(previewLayer)
        setUpImg();
        AuthLogic = Logic();
        
        
        tick = UIImageView(image: UIImage(named: "tick.png"));
//        tick!.frame = CGRectMake(
//            (self.view.frame.size.width/2) - 100,
//            (self.view.frame.size.height/2) - 100,
//            200, 200);

        tick!.frame = CGRectMake(
            100,
            100,
            200, 200);
        tick!.hidden = true;
            self.view.addSubview(tick!);
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func captureOutput(captureOutput: AVCaptureOutput!, didOutputMetadataObjects metadataObjects: [AnyObject]!, fromConnection connection: AVCaptureConnection!) {
        var detectionString: String?;

        var barCodeTypes = [AVMetadataObjectTypeUPCECode, AVMetadataObjectTypeCode39Code, AVMetadataObjectTypeCode39Mod43Code,
            AVMetadataObjectTypeEAN13Code, AVMetadataObjectTypeEAN8Code, AVMetadataObjectTypeCode93Code, AVMetadataObjectTypeCode128Code,
            AVMetadataObjectTypePDF417Code, AVMetadataObjectTypeQRCode, AVMetadataObjectTypeAztecCode];
        
        for metadata in metadataObjects {
            for type in barCodeTypes {
                if (metadata.type == type) {
                    detectionString = metadata.stringValue;
                }
            }
            if (detectionString != nil) {
                handleQR(detectionString!);
                break;
            } else {
            }
        }
    }
    
    func setUpImg () {
        imgOverlay = UIImageView(image: UIImage(named: "01_background-02.png"));
        imgOverlay?.frame = CGRectMake(0, 0, self.view.bounds.size.width, self.view.bounds.size.height);
//        imgOverlay?
//        imgOverlay?.center = imgOverlay!.superview!.center;
        //        imgOverlay!.image!.size =
        self.view.addSubview(imgOverlay!);
    }
    
    
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue!, sender: AnyObject!) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */
    
    
    func handleQR (code: String) {
        if timesSent == 1 {
            return ;
        }
        
//        UIView.animateWithDuration(1.0,
//            delay: 2.0,
//            options: nil,
//            animations: {
//                self.tick?.alpha = 1.0;
//            },
//            completion: { finished in
//                println("Bug moved left!")
//        })
        
        AudioServicesPlaySystemSound(1352)

        tick!.hidden = false;
        tick!.alpha = 0.0
        UIView.animateWithDuration(1.0, animations: {
            self.tick!.alpha = 1.0
            }, completion: {
                (value: Bool) in
                self.tick!.hidden = true;
                println(">>> Animation done.")
        })
        
        


        
        println("Got " + code);
        
        var QR = AuthLogic!.parseQRCode(code);
        println(QR!.action);
        if (QR != nil) {
            if (QR!.action == 0) {
                timesSent = timesSent+1;
                AuthLogic!.loginToServer(QR!.hash1!, secret: QR!.userSecret!, RQR: QR!.RQR!);
            } else if (QR!.action == 1) {
                //AuthLogic.register(QR);
            }
        }
    }
    
    func addGestures() {
        var swipeRightGesture = UISwipeGestureRecognizer(target: self, action: "swipeRight:");
        swipeRightGesture.direction = UISwipeGestureRecognizerDirection.Right;
        self.view.addGestureRecognizer(swipeRightGesture);
        
        var swipeLeftGesture = UISwipeGestureRecognizer(target: self, action: "swipeLeft:");
        swipeLeftGesture.direction = UISwipeGestureRecognizerDirection.Left;
        self.view.addGestureRecognizer(swipeLeftGesture);
    }
    
    func swipeRight(gestureRecognizer:UISwipeGestureRecognizer) {
        println("swiped right")
//        self.parent?.swipeLeft(gestureRecognizer);
        
//        self.parent.swipeRight(gestureRecognizer);
    }
    
    func swipeLeft(gestureRecognizer:UISwipeGestureRecognizer) {
        println("swiped left")
//        self.parent?.swipeRight(gestureRecognizer);
        
        //        self.parent.swipeRight(gestureRecognizer);
    }
    

    

}
