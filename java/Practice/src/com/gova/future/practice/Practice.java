import java.lang.reflect.Array;
import java.util.Arrays;

public class Practice {

    public static void main(String[] args) {
        String name = "govardhan";
        System.out.println(name);

        String[] names = {"Gova","kowshik","Some","Good"};

        System.out.println(Arrays.toString(names));

        // String are immutable - Means if the values are same the ids are same.
        // String are mutable using string buffer
        StringBuffer s = new StringBuffer("Govardhan");
        s.append("Gova");
        System.out.println(s);

        String name1 = "Some";
        String name2 = "Some";
        System.out.println(name1.length());
        System.out.println(name1.toUpperCase());
        System.out.println(name1.equals("Some"));
        System.out.println(name1 == name2);


        //Arrays

        int bookPrices[] = {298, 459, 788, 123, 456};
        String bookNames[] = {"Fountain head","Good and Evil","Power of Consiousness","48 Rules of Power"};
        try{
        for(int i=0;i < bookPrices.length;i++){
            System.out.println(bookNames[i] + " - " + bookPrices[i]);
        }
        }
        catch (Exception ex){
            System.out.println(ex);
        }

        String[] authorNames = {"Ayn Rand","Fedrick","Marcus","Happy"};
        System.out.println("--------------");
        for (String authorName: authorNames){
            System.out.println(authorName);
        }
    }
}
