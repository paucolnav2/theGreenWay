package Logs;

import java.io.IOException;
import java.util.logging.*;

public class LogsController {
    public static void inicializar() {
        Logger logger = Logger.getLogger("");

        for (Handler handler : logger.getHandlers()) {
            logger.removeHandler(handler);
        }

        System.setProperty("java.util.logging.SimpleFormatter.format", "[%1$tF %1$tT] [%4$s] [%2$s] %5$s %n");

        try {
            ConsoleHandler ch = new ConsoleHandler();
            ch.setLevel(Level.INFO);
            ch.setFormatter(new SimpleFormatter());

            FileHandler fh = new FileHandler("logs/log.log", true);
            fh.setLevel(Level.INFO);
            fh.setFormatter(new SimpleFormatter());

            logger.addHandler(ch);
            logger.addHandler(fh);
            logger.setLevel(Level.INFO);

        } catch (IOException e) {
            System.err.println("Error inicializando el sistema de logs: ");
            e.printStackTrace();
        }
    }
}
