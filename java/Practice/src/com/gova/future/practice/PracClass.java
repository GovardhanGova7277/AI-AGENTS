import java.sql.SQLOutput;
import java.util.regex.Pattern;

public class PracClass {
    public static void main(String[] args) {

        int num; // declare the variable
        num = 10; // assigning & initialization of variable


        KeyBoard obj = new KeyBoard();

        obj.pressed();
        obj.throwIt();
        System.out.println("Number of keys remaining after pressing : " + obj.keys);


        AdvKeyBoard advObj = new AdvKeyBoard();
        advObj.hitNum();
        advObj.specs();

        //Authenticate class

        UserAuth user = new UserAuth("Govardhan7277", "7277","govardhan@gmail.com");
        System.out.println(user.getEmail());
        user.validate();


    }

}

// Encapsulation Means

class UserAuth
{
    public String username;
    private String password;
    private String email;

    public static final String USERNAME_REGEX = "^[a-zA-Z0-9_]{3,20}$";

    public UserAuth(String username,String password,String email){
        this.username = username;
        this.password = password;
        this.email = email;
    }


    public String getEmail(){
        return this.email;
    }
    public void validate(){
        if (this.username != null && Pattern.matches(USERNAME_REGEX, this.username)){
            System.out.println("Username is valid");
        }

    }


}

class KeyBoard
{

    //instance variables
    int keys = 80;
    String color  = "grey";

    public void pressed()
    {
        System.out.println("Signal Sent");
        keys--;
    }
    public void throwIt(){
        System.out.println("Got hit");
    }

}

class AdvKeyBoard extends KeyBoard
{


    public AdvKeyBoard(){
        keys = 200;
        color = "White";
    }
    public void hitNum()
    {
        System.out.println("Sent the number");
        keys--;
    }
    public void specs()
    {
        System.out.println(keys + " " + color);
    }
}
