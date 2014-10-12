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
    var menuIsOpened = false;
    
//    var activeController:    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        self.initController()
        self.loadAuthView()
        self.addGestures()
        
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
    
    func loadAccountsView () {
        //        var accountsStoryBoard = UIStoryboard(name: "Accounts",bundle:nil);
        //  var accountListController = accountsStoryBoard.instantiateViewControllerWithIdentifier("AccountsHomeController");
        
        //        self.setActiveViewWith(accountListController);
    }
    
    func addGestures() {
        var swipeRightGesture = UISwipeGestureRecognizer(target: self, action: "swipeRight:");
        
        swipeRightGesture.direction = UISwipeGestureRecognizerDirection.Right;
        self.view.addGestureRecognizer(swipeRightGesture);
        
        
        var swipeLeftGesture = UISwipeGestureRecognizer(target: self, action:  "swipeLeft:");
        
        swipeRightGesture.direction = UISwipeGestureRecognizerDirection.Left;
        self.view.addGestureRecognizer(swipeLeftGesture);
        
    }
    
    @IBAction func menuButtonPressed(sender: AnyObject) {

        println(sender.currentTitle!);
        
        var currentTitle = (sender.currentTitle!)! as String!;
        
        switch currentTitle {
            case "Authenticate":
                self.loadAuthView();
            
            case "Accounts":
                self.loadAccountsView();
            
            default:
                self.loadAuthView();
            
        }
    }
    
    
    func swipeLeft(gestureRecognizer:UISwipeGestureRecognizer) {
        if(!self.menuIsOpened) {
            
            self.menuIsOpened = true;
            
            UIView.animateWithDuration(0.3 , animations : {
                self.shiftHorizontally(200);
            })
        }
    }
    
    func swipeRight(gestureRecognizer:UISwipeGestureRecognizer) {
        if(self.menuIsOpened) {
            
            self.menuIsOpened = false;
            
            UIView.animateWithDuration(0.3 , animations : {
                self.shiftHorizontally(-200);
            })
        }
    }

    func shiftHorizontally(points:Int) {
        var frame = self.activeViewContainer!.frame;
        frame.origin.x += CGFloat(points);
        
        self.activeViewContainer!.frame = frame;
        
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
