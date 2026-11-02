interface Notifications{
    void send(String message);
}

//subclass1 SMS
class SmsNotification implements Notifications{

    public void send(String messages){
        System.out.println(messages);
    }

}

class EmailNotifications implements Notifications{
    public void send(String messages){
        System.out.println(messages);
    }
}
public class PracPolyMorphism {

    public static void main(String[] args) {
        System.out.println("PolyMorphism Example");

        Notifications sender;

        sender = new SmsNotification();
        sender = new EmailNotifications();

        sender.send("Your OTP is 7277");
        sender.send("Thank you, we are verified and you have successfully logged in!!");

    }

}


