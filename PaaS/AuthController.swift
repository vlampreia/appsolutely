//
//  AuthController.swift
//  PaaS
//
//  Created by Bartlomiej Siemieniuk on 11/10/2014.
//  Copyright (c) 2014 Team Goat. All rights reserved.
//


import UIKit
import AVFoundation


class AuthController: UIViewController, AVCaptureMetadataOutputObjectsDelegate {
    
    required init(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    var lol:String? = nil;
    
    var highlightView: UIView?;
    
    var _label: UILabel?;
    
    var _session: AVCaptureSession?;
    var _device:  AVCaptureDevice?;
    var _input:     AVCaptureDeviceInput?;
    var _output:    AVCaptureMetadataOutput?;
    var _prevLayer: AVCaptureVideoPreviewLayer?;
    
    //    let captureSession = AVCaptureSession();
    //    var captureDevice : AVCaptureDevice?
    //    var prevLayer: AVCaptureVideoPreviewLayer?;
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        self.highlightView = UIView();
        
        self.highlightView!.autoresizingMask = UIViewAutoresizing.FlexibleTopMargin | UIViewAutoresizing.FlexibleLeftMargin | UIViewAutoresizing.FlexibleRightMargin | UIViewAutoresizing.FlexibleBottomMargin;
        self.highlightView!.layer.borderColor = UIColor.greenColor().CGColor;
        self.highlightView!.layer.borderWidth = 3;
        
        self.view.addSubview(self.highlightView!);
        
        _label = UILabel();
        _label!.frame = CGRectMake(0, self.view.bounds.size.height - 80, self.view.bounds.size.width, 40);
        _label!.backgroundColor = UIColor.whiteColor();
        _label!.textColor = UIColor.blackColor();
        _label!.textAlignment = NSTextAlignment.Center;
        _label!.text = "none";
        
        self.view.addSubview(_label!);
        
        //        if _session == nil {
        _session = AVCaptureSession();
        //        }
        
        _device  = AVCaptureDevice.defaultDeviceWithMediaType(AVMediaTypeVideo);
        
        var err : NSError? = nil
        if err != nil {
            println("error: \(err?.localizedDescription)")
        }
        
        _input = AVCaptureDeviceInput.deviceInputWithDevice	(_device!, error: &err) as? AVCaptureDeviceInput;
        
        if(_session!.canAddInput(_input)) {
            _session!.addInput(_input);
        } else {
            print("CANT");
        }
        
        
        _output = AVCaptureMetadataOutput();
        
        
        _output!.setMetadataObjectsDelegate(self, queue: dispatch_queue_create("hi.there.you.", 0));
        
        _output!.metadataObjectTypes = _output!.availableMetadataObjectTypes;
        
        
        _prevLayer = AVCaptureVideoPreviewLayer(session: _session);
        _prevLayer!.frame = self.view.bounds;
        _prevLayer!.videoGravity = AVLayerVideoGravityResizeAspectFill;
        self.view.layer.addSublayer(_prevLayer!);
        
        
        
        self.lol = "WTF HAHA";
        
        println("Session runs")
        
        _session!.addOutput(_output!);
        
        print(_session);
        
        _session!.startRunning();
        
        
        //self.view.layer.addSublayer(previewLayer)
        //previewLayer.frame = self.view.layer.frame
        //captureSession.startRunning()
        //configureDevice();
        
    }
    
    override init(nibName nibNameOrNil: String!, bundle nibBundleOrNil: NSBundle!) {
        // subview = UIView()
        super.init(nibName: nil, bundle: nil)
    }
    
    //    convenience override init() {
    //        self.init(nibName: nil, bundle: nil)
    //    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    func captureOutput(captureOutput: AVCaptureOutput!, didOutputMetadataObjects metadataObjects: [AnyObject]!, fromConnection connection: AVCaptureConnection!)  {
        
        println("sdfsdf")
        var highlightViewRect = CGRectZero;
        var barCodeObj = AVMetadataMachineReadableCodeObject();
        var detectionString: String?;
        var barCodeTypes = [AVMetadataObjectTypeUPCECode, AVMetadataObjectTypeCode39Code, AVMetadataObjectTypeCode39Mod43Code,
        AVMetadataObjectTypeEAN13Code, AVMetadataObjectTypeEAN8Code, AVMetadataObjectTypeCode93Code, AVMetadataObjectTypeCode128Code,
        AVMetadataObjectTypePDF417Code, AVMetadataObjectTypeQRCode, AVMetadataObjectTypeAztecCode];
    
        for metadata in metadataObjects {
            for type in barCodeTypes {
                if (metadata.type == type) {
                        barCodeObj = _prevLayer!.transformedMetadataObjectForMetadataObject(metadata as AVMetadataMachineReadableCodeObject) as AVMetadataMachineReadableCodeObject
                        highlightViewRect = barCodeObj.bounds;
                    detectionString = metadata.stringValue;
                }
            }
    
            if (detectionString != nil) {
                _label!.text = detectionString;
                println(detectionString);
                break;
            } else {
                _label!.text = "";
            }
        
        }
        
        self.highlightView!.frame = highlightViewRect;
    }
}

//    func configureDevice() {
//        if let device = captureDevice {
//            device.lockForConfiguration(nil)
//            device.focusMode = .Locked
//            device.unlockForConfiguration()
//        }
//    }
//

/*
// MARK: - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
override func prepareForSegue(segue: UIStoryboardSegue!, sender: AnyObject!) {
// Get the new view controller using segue.destinationViewController.
// Pass the selected object to the new view controller.
}
*/
