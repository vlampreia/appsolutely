//
//  MainControllerViewController.swift
//  PaaS
//
//  Created by Bartlomiej Siemieniuk on 11/10/2014.
//  Copyright (c) 2014 Team Goat. All rights reserved.
//

import UIKit

class MainController: UIViewController {
    
    var activeViewContainer: UIView? = nil;
//    var activeController:    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.initController()
        self.loadAuthView()
        
        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        

        // Dispose of any resources that can be recreated.
    }
    
    func initController() {
        self.activeViewContainer = UIView(frame: UIScreen.mainScreen().bounds);
        self.view.addSubview(self.activeViewContainer!);
    }
    
    func loadAuthView () {
        var authController = AuthController(nibName: "AuthController", bundle: nil);
        self.setActiveViewWith(authController);
    }
    
    func setActiveViewWith(controller:UIViewController) {
        var activeSubviews = self.activeViewContainer?.subviews;
        
        if(activeSubviews?.count == 1) {
            var view = activeSubviews![0] as UIView;
            view.removeFromSuperview()
        }
        
        self.activeViewContainer?.addSubview(controller.view);
        
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
